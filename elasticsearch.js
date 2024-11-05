// elasticsearch.js
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: 'http://localhost:9200' // Asegúrate de que el puerto y la IP coincidan con tu configuración de ElasticSearch
});

module.exports = client;