const express = require('express');
const soap = require('soap');
const MultivasXSD = require('./routes/MultivasXSD');
const conectarAMySQL = require ('./Connections');
const { ok } = require('assert');
const morgan = require('morgan');

var respuesta;
const app = express();
const PORT = process.env.PORT || 3001

app.use('/', MultivasXSD);
app.use(morgan('tiny'));

var MultivasService = {
    MultivasIsMigrated: {
        MultivasIsMigrated: {
            isMigrated: async (args, cb, headers) => {
               
                const { snb } = args;
                console.log('snb :'+snb)
                respuesta = await conectarAMySQL(snb);             
                //server.addSoapHeader //Para devolver Headers
                return {respuesta};
            },
        }
    }
};

var xml = require('fs').readFileSync('./wsdl/MultivasIsMigrated_v1.wsdl', 'utf8');

app.listen(PORT, () => {
    console.log(`SOAP app listening on port ${PORT}!`);
    soap.listen(app, '/MultivasIsMigrated_v1', MultivasService, xml);
});

