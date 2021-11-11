const soap = require('soap');
const express = require('express');
const path = require('path');

const app = express();

app.get('/Header_DOCLIT.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/Header_DOCLIT.xsd'));
});

app.get('/MultivasIsMigrated_v1.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/MultivasIsMigrated_v1.xsd'));
});

app.get('/MessageFault_DOCLIT.xsd', (req, res) => {
    res.sendFile(path.resolve('wsdl/MessageFault_DOCLIT.xsd'));
});

var myService = {
    MultivasIsMigrated: {
        MultivasIsMigrated: {
            isMigrated: (args) => {
                const { snb } = args;
                let respuesta = "OK"
                return {
                    respuesta: snb //Podemos tmb escribir respuesta solo y se expande automaticamente a respuesta:respuesta
                };
            },
        }
    }
};


var xml = require('fs').readFileSync('./wsdl/MultivasIsMigrated_v1.wsdl', 'utf8');

app.listen(3030, () => {
    console.log('listening on port 3030');
    soap.listen(app, '/MultivasIsMigrated_v1', myService, xml, () => {
        console.log('server initialized');
    });
});


//http://127.0.0.1:3030/MultivasIsMigrated_v1?wsdl