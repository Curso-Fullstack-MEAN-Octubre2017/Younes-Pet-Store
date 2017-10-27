var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


//Llamamos a la clase donde definimos los datos 
//var crud = require("./tests/customer_crud_tests.js");


//Aqui se importa todos los archivos de la carpeta rutas
var customer_routes = require('./routes/customer-routes');
var pet_routes = require('./routes/pet-routes');
var appointment_routes = require('./routes/appointment-routes');

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
app.use('/api', pet_routes);
app.use('/api',appointment_routes);

//// Nuevas Rutas van aqui:
//app.use('/sample', sample);

//Front End
app.all("*", (req, res) => {
res.sendFile(path.resolve("public/index.html"));
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // log the error
  console.error(err)
  res.sendStatus(err.status || 500);
});


module.exports = app;
