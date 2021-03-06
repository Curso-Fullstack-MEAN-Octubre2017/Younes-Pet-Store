'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador 
var CustomerController = require('../controllers/cutomer-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/customers', CustomerController.getCustomers);

api.get('/customers/:id', CustomerController.getCustomer);

//Post
api.post('/customers', CustomerController.saveCustomer);

//put
api.put('/customers/:id', CustomerController.putCustomer);

//delete
api.delete('/customers/:id', CustomerController.deleteCustomer);



//exportando el modulo
module.exports = api;