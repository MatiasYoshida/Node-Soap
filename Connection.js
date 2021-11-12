// Obtenga el servicio mysql
var mysql = require('mysql');

// Agregue las credenciales para acceder a su base de datos
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'password',
    database : 'db'
});

// conectarse a mysql
connection.connect(function(err) {
    // en caso de error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Realizar una consulta
$query = 'select valueTxt from Multivas where id = 1';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }

    console.log("Consulta ejecutada con éxito:", rows);
});

// Cerrar la conexión
connection.end(function(){
    // La conexión se ha cerrado
});