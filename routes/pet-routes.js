'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador de customer
var PetController = require('../controllers/pet-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/pets/:id', PetController.getPets);

api.get('/pet/:id', PetController.getPet);

//Post
api.post('/newpet', PetController.savePet);

//put
api.put('/pet/:id', PetController.putPet);

//exportando el modulo
module.exports = api;