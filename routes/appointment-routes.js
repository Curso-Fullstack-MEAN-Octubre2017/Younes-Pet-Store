'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador de customer
var AppointmentController = require('../controllers/appointment-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/appointments', AppointmentController.getAppointments);

api.get('/appointments/:startDate/:endDate', AppointmentController.getAppointmentsByDate);

api.get('/appointments/:month', AppointmentController.getAppointments);



//Post
api.post('/appointments', AppointmentController.saveAppointment);




//exportando el modulo
module.exports = api;