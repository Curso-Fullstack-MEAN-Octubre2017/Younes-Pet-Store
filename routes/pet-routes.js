'use strict'

//cargando el modulo express
var express = require('express');


//Aqui se importa el controlador
var PetController = require('../controllers/pet-controller');

//asignando el router de express a variable api
var api = express.Router();


//Aqui se crea las rutas por cada metodos definidos en el controlador

//Get
api.get('/pets/:owner', PetController.getPets);
//Get one client
api.get('/pets/card/:id', PetController.getPet);

//Post
api.post('/pets/card/', PetController.savePet);

//put
api.put('/pets/card/:id', PetController.putPet);
api.delete('/pets/card/:id', PetController.deletePet);

//exportando el modulo
module.exports = api;