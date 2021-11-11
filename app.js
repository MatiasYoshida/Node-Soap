const express = require('express');
const soap = require('soap');

// Importar Rutas
const MultivasXSD = require('./routes/MultivasXSD');

const app = express();
const PORT = process.env.PORT || 3001

app.use('/', MultivasXSD);

var MultivasService = {
    MultivasIsMigrated: {
        MultivasIsMigrated: {
            isMigrated: (args, cb, headers) => {
                console.log(headers);
                //console.log(args);
                const { snb, pepito } = args;
                let respuesta = "Cristian se la re come"

                //server.addSoapHeader //Para devolver Headers

                return {
                    respuesta //Podemos tmb escribir respuesta solo y se expande automaticamente a respuesta:respuesta
                };
            },
        }
    }
};

var xml = require('fs').readFileSync('./wsdl/MultivasIsMigrated_v1.wsdl', 'utf8');

app.listen(PORT, () => {
    console.log(`SOAP app listening on port ${PORT}!`);
    soap.listen(app, '/MultivasIsMigrated_v1', MultivasService, xml);
});