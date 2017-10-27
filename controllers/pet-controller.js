'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Pet = require('../models/pet');

//funciones del controlador para recoger datos de la base de datos
function getPets(req, res) {
	console.log("hola owner");
    Pet.find({'idClient': req.params.owner}, function (err, pets) {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        //if (!customers) return res.status(404).send({message: `No existen clientes`});
        res.send(200, pets);
    })
}


function getPet(req, res) {
	console.log("hola pet");
	console.log(req.params.id);
	Pet.findById(req.params.id,(err, pet) => {
        if (err) {
            console.error(err);
        } else {
            res.json(pet);
        }
    })
}
//Guardar los datos con el metodo post en la base de datos
function savePet(req, res) {
	
	//instanciar un objeto nuevo para crear nuevo cliente
    var pet = new Pet();
    
    //se guarda los parametros que nos vienen por POST en el body
    //se recoje el cuerpo de la peticion

    //el cuerpo del formulario que vamos a mandar despues con el post
    var params = req.body;
    
    console.log("save pet params",params);

    pet.name = params.name;
    pet.birthDate = params.birthDate;
    pet.picture = params.picture;
    pet.shipNumber = params.shipNumber;
    pet.especie = params.especie;
    pet.raza = params.raza;
    pet.idClient=params.idClient;

    //funcion callback si no hay error devuelve el usuario guardado sino devuelve el error
    pet.save((err, petStored) => {
    	console.log("save petStored",petStored);
        //si existe un error
        /*if (err) return res.status(500).send({message: "Error al guardar el cliente"});
        //si el usuario guardado no existe
        /*if (!customerStored) return res.status(404).send({message: "No se ha registrado el cliente"});
*/
        //si OK devuelve un objeto customer con los datos guardados en la bdat
        res.json(petStored);

    });


}

function putPet(req,res){


    Pet.findOneAndUpdate({_id :req.params.id},req.body,{upsert: true},(err, petStored) => {
        if (err) {
            console.error(err);
        } else {
           res.json(petStored);
        }
    });



}

function deletePet(req,res){
	var id = req.params.id;

    Pet.remove({_id: id}, function (err) {
        if (err) return res.status(500).send({message: `Error al borrar: ${err}`});
        res.json({message: 'borrado correctamente'});
    });
}

//export las funciones

module.exports = {
		savePet,
		getPets,
		getPet,
		putPet,
		deletePet	
};