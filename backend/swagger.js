// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Autobots',
            version: '1.0.0',
            description: 'API Documentation for Autobots',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update this with your server URL
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes/**/*.js'], // Path to my API files includes the routes folder and its subdirectories
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
