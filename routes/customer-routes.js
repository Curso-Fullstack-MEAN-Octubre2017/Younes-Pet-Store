'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador de customer
var CustomerController = require('../controllers/cutomer-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/customers', CustomerController.getCustomers);

//Post
api.post('/newcustomer', CustomerController.saveCustomer);


//exportando el modulo
module.exports = api;