const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `${process.env.AUTH0_ISSUER_BASE_URL}/`,
    algorithms: ['RS256']
});

// Protege las rutas de la API
app.use('/api/origenes', checkJwt, (req, res) => {
    res.json({ message: 'Acceso autorizado a la API' });
});
