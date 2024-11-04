// const express = require('express');
// const { getOrAddCookies, scrapeOrigin } = require('./scrapingService');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// require('dotenv').config();
// const { auth, requiresAuth } = require('express-openid-connect');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Configuración de Auth0 con console.log para verificar valores
// const authConfig = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.AUTH0_SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };

// // Mostrar valores de configuración en la consola (solo para prueba)
// console.log('Configuración de Auth0:');
// console.log(`AUTH0_SECRET: ${process.env.AUTH0_SECRET}`);
// console.log(`BASE_URL: ${process.env.BASE_URL}`);
// console.log(`CLIENT_ID: ${process.env.AUTH0_CLIENT_ID}`);
// console.log(`ISSUER_BASE_URL: ${process.env.AUTH0_ISSUER_BASE_URL}`);
// console.log(`PORT: ${PORT}`);

// // Middleware de Auth0 y otros
// app.use(auth(authConfig)); // Agrega autenticación
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Ruta pública para ver todos los orígenes con log
// app.get('/api/origenes', (req, res) => {
//     console.log('Accediendo a /api/origenes');
//     const origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
//     res.json(origenes);
// });

// // Ruta protegida para agregar un nuevo origen con log
// app.post('/api/origenes', requiresAuth(), async (req, res) => {
//     console.log('Accediendo a /api/origenes [POST]');
//     let origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
//     const { url, nombre, uso, descripcion } = req.body;

//     console.log(`Datos recibidos: URL=${url}, Nombre=${nombre}, Uso=${uso}, Descripción=${descripcion}`);

//     const origenExistente = origenes.find(origen => origen.url === url);
//     if (origenExistente) {
//         return res.status(400).json({ mensaje: 'El origen ya está registrado.' });
//     }

//     const cookiesFile = `${nombre}_cookies.json`;
//     await getOrAddCookies(url, cookiesFile);

//     origenes.push({ nombre, url, uso, descripcion, cookies_file: cookiesFile });
//     fs.writeFileSync('origenes.json', JSON.stringify(origenes, null, 4));

//     res.json({ mensaje: 'Origen agregado exitosamente' });
// });

// // Ruta protegida para scrapear en función de la palabra clave
// app.get('/api/scrapear/:nombre', requiresAuth(), async (req, res) => {
//     console.log(`Accediendo a /api/scrapear/${req.params.nombre}`);
//     const nombre = req.params.nombre;
//     const palabraClave = req.query.palabraClave || "";
//     console.log(`Palabra clave: ${palabraClave}`);

//     const origenes = JSON.parse(fs.readFileSync('origenes.json', 'utf-8'));
//     const origen = origenes.find(o => o.nombre === nombre);

//     if (!origen) return res.status(404).json({ mensaje: 'Origen no encontrado' });

//     const datos = await scrapeOrigin(origen.url, origen.cookies_file, palabraClave);
//     res.json({ mensaje: `Artículos obtenidos${palabraClave ? ` que contienen '${palabraClave}'` : ''} en ${nombre}`, datos });
// });

// // Iniciar el servidor
// app.listen(PORT, () => {
//     console.log(`API listening on port ${PORT}`);
// });
