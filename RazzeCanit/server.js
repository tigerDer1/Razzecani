const express = require ('express');
const app = express()
const fs = require ('fs');
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJSdoc = require('swagger-jsdoc');

app.use (express.json())

const options = { // swagger options
    definition: {
        openapi: "3.0.0",
        info: { // metadata
            title: "Razzecani API",
            version: "1.0.0",
            description: "A simple Express Razzecani API"
        },
        servers: [
            {
                url: "http://localhost:3000" // server
            }
        ]
        },
        apis: ["./razzecani/routes.js"] // files containing annotations as per swagger specs
    }

const specs = swaggerJSdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // serve swagger ui on /api-docs endpoint


app.get('/', (req, res)=> {
    res.send ('hello wolrd')
}) 

app.use ('/api/razzecani/', require('./razzecani/routes'))

app.listen (port, ()=>{
    console.log ('server run on port'+port)
})