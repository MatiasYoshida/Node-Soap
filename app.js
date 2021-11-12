const express = require('express');
const soap = require('soap');

// Obtenga el servicio mysql
var mysql = require('mysql');

var respuesta;
// Agregue las credenciales para acceder a su base de datos
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    port     : '23306',
    password : 'password',
    database : 'db'
});

connection.connect(function(err) {
    // en caso de error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});



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
                const { snb } = args;
                

                $query = 'select valueTxt from Multivas where id = '+ snb;

                connection.query($query, function(err, rows, fields) {
                if(err){
                    console.log("An error ocurred performing the query..");
                    return;
                }
                respuesta = rows[0].valueTxt;
                console.log("Consulta ejecutada con éxito:", rows[0].valueTxt);
                });

                connection.end(function(){
                    // La conexión se ha cerrado
                });
                
                //server.addSoapHeader //Para devolver Headers
                //select valueTxt from Multivas where id = args.snb
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

