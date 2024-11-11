// elasticsearch.js
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200' // Asegúrate de que el puerto y la IP coincidan con tu configuración de ElasticSearch
});

module.exports = client;

const express = require('express');
const router = express.Router();
const client = require('./elasticsearch'); // Importamos el cliente que configuramos antes

// Ruta para añadir un origen a ElasticSearch
router.post('/add-origen', async (req, res) => {
    const { nombre, url, cookies_file } = req.body;

    try {
        // Insertar el origen en ElasticSearch
        const result = await client.index({
            index: 'origenes', // Nombre del índice en ElasticSearch
            body: {
                nombre,
                url,
                cookies_file,
                timestamp: new Date()
            }
        });
        res.status(200).json({ message: 'Origen añadido correctamente', result });
    } catch (error) {
        console.error('Error al guardar el origen en ElasticSearch:', error);
        res.status(500).json({ message: 'Error al guardar el origen' });
    }
});

module.exports = router;
