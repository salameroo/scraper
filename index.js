const express = require('express');
const { getOrAddCookies, scrapeOrigin } = require('./scrapingService');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors()); // Permite peticiones de React
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para ver todos los orígenes
app.get('/api/origenes', (req, res) => {
    const origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
    res.json(origenes);
});

// Ruta para agregar un nuevo origen
app.post('/api/origenes', async (req, res) => {
    let origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
    const { url, nombre, uso, descripcion } = req.body;

    // Verificar si la URL ya existe en los orígenes
    const origenExistente = origenes.find(origen => origen.url === url);
    if (origenExistente) {
        return res.status(400).json({ mensaje: 'El origen ya está registrado.' });
    }

    // Guardar cada archivo de cookies en la carpeta `cookies`
    const cookiesFile = `${nombre}_cookies.json`;
    await getOrAddCookies(url, cookiesFile);

    origenes.push({ nombre, url, uso, descripcion, cookies_file: cookiesFile });
    fs.writeFileSync('origenes.json', JSON.stringify(origenes, null, 4));

    res.json({ mensaje: 'Origen agregado exitosamente' });
});

// Ruta para scrapear en función de la palabra clave
app.get('/api/scrapear/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const palabraClave = req.query.palabraClave || "";  // Palabra clave opcional
    const origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
    const origen = origenes.find(o => o.nombre === nombre);

    if (!origen) return res.status(404).json({ mensaje: 'Origen no encontrado' });
    const datos = await scrapeOrigin(origen.url, origen.cookies_file, palabraClave);

    res.json({ mensaje: `Artículos obtenidos${palabraClave ? ` que contienen '${palabraClave}'` : ''} en ${nombre}`, datos });
});

// Iniciar el servidor
app.listen(5000, () => console.log('API listening on port 5000'));
