const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        title: 'Blog API',
        description: 'Auto-generated Swagger',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/',
};

const outputFile = './swagger.json';
// Укажи точку входа, откуда тянутся все роуты (app.ts или главный router)
const routes = ['../app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);