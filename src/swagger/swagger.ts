import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
        title: 'Blog API',
        description: 'Auto-generated Swagger',
    },
    tags: [
        { name: 'Auth', description: 'Auth related endpoints' },
        { name: 'Blogs', description: 'Blog related endpoints' },
        { name: 'Posts', description: 'Posts related endpoints' },
        { name: 'Comments', description: 'Comments related endpoints' },
        { name: 'Users', description: 'Users related endpoints' },
        { name: 'Devices', description: 'Devices related endpoints' },
        { name: 'Testing', description: 'Testing related endpoints' },
    ],
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