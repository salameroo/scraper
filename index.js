const express = require('express');
const { getOrAddCookies, scrapeOrigin } = require('./scrapingService');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // para construir rutas de archivos
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();
const PORT = process.env.PORT || 5000;
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://somontanosocial.api.scraper',
    issuerBaseURL: 'https://dev-1duhzfzedlymqcp6.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);
// Configuración de Auth0
const authConfig = {
    authRequired: true,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    authorizationParams: {
        audience: process.env.AUTH0_API_AUDIENCE, // Configura esto en tu .env
        response_type: 'token id_token', // Incluye el token de acceso en la respuesta
        scope: 'openid profile email'
    }
};


app.use(auth(authConfig));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta al archivo origenes.json en la carpeta "storage"
const origenesPath = path.join(__dirname, 'storage', 'origenes.json');

// Ruta pública para ver todos los orígenes
app.get('/api/origenes', (req, res) => {
    console.log('Accediendo a /api/origenes');
    const origenes = JSON.parse(fs.readFileSync(origenesPath, 'utf-8'));
    res.json(origenes);
});

app.get('/api/user', requiresAuth(), (req, res) => {
    res.json({
        user: req.oidc.user,  // Información del usuario
        idToken: req.oidc.idToken,  // Token de identidad
    });
});

// Ruta protegida para agregar un nuevo origen
app.post('/api/origenes', requiresAuth(), async (req, res) => {
    console.log('Accediendo a /api/origenes [POST]');
    let origenes = JSON.parse(fs.readFileSync(origenesPath, 'utf-8'));
    const { url, nombre, uso, descripcion } = req.body;

    console.log(`Datos recibidos: URL=${url}, Nombre=${nombre}, Uso=${uso}, Descripción=${descripcion}`);

    const origenExistente = origenes.find(origen => origen.url === url);
    if (origenExistente) {
        return res.status(400).json({ mensaje: 'El origen ya está registrado.' });
    }

    const cookiesFile = path.join(__dirname, 'storage', `${nombre}_cookies.json`);
    await getOrAddCookies(url, cookiesFile);

    origenes.push({ nombre, url, uso, descripcion, cookies_file: cookiesFile });
    fs.writeFileSync(origenesPath, JSON.stringify(origenes, null, 4));

    res.json({ mensaje: 'Origen agregado exitosamente' });
});

// Ruta protegida para scrapear en función de la palabra clave
app.get('/api/scrapear/:nombre', requiresAuth(), async (req, res) => {
    console.log(`Accediendo a /api/scrapear/${req.params.nombre}`);
    const nombre = req.params.nombre;
    const palabraClave = req.query.palabraClave || "";

    const origenes = JSON.parse(fs.readFileSync(origenesPath, 'utf-8'));
    const origen = origenes.find(o => o.nombre === nombre);

    if (!origen) return res.status(404).json({ mensaje: 'Origen no encontrado' });

    const datos = await scrapeOrigin(origen.url, origen.cookies_file, palabraClave);
    res.json({ mensaje: `Artículos obtenidos${palabraClave ? ` que contienen '${palabraClave}'` : ''} en ${nombre}`, datos });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
