'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador de customer
var PetController = require('../controllers/pet-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/pets', PetController.getPets);

api.get('/pets/:id', PetController.getPet);

//Post
api.post('/newpet', PetController.savePet);


//exportando el modulo
module.exports = api;