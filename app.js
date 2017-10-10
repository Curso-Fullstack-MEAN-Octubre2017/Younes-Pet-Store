var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//var sample = require('./routes/sample');


//Llamamos a la clase donde definimos los datos 
//var crud = require("./tests/customer_crud_tests.js");


//Aqui se importa todos los archivos de la carpeta rutas
var customer_routes = require('./routes/customer-routes');

//Conectamos con la base de datos
mongoose.connect('mongodb://localhost/customer', {useMongoClient:true});




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Base route
//Crea una ruta base para todas las rutas que corresponden a la api
app.use('/api', customer_routes);

//// Nuevas Rutas van aqui:
//app.use('/sample', sample);

//Front End
app.all("*", (req, res) => {
res.sendFile(path.resolve("public/index.html"));
})



module.exports = app;
