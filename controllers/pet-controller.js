'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Pet = require('../models/pet');

//funciones del controlador para recoger datos de la base de datos
function getPets(req, res) {

    Pet.find({}, (err, pets) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        //if (!customers) return res.status(404).send({message: `No existen clientes`});
        res.send(200, pets);
    })
}


function getPet(req, res) {
    var id = req.params.id;

    console.log(id);

    Pet.findById(id, (err, pets) => {
        console.log(pets);
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!pets) return res.status(404).send({message: `No existen clientes`});
        res.send(200, pets);
    });
}
//Guardar los datos con el metodo post en la base de datos
function savePet(req, res) {
	
	//instanciar un objeto nuevo para crear nuevo cliente
    var pet = new Pet();
    
    //se guarda los parametros que nos vienen por POST en el body
    //se recoje el cuerpo de la peticion

    //el cuerpo del formulario que vamos a mandar despues con el post
    var params = req.body;
    console.log('hola3');
    console.log(params);

    pet.name = params.name;
    pet.birthDate = params.birthDate;
    pet.picture = params.picture;
    pet.especie = params.especie;
    pet.raza = params.raza;
    pet.idClient=params.idClient;

    //funcion callback si no hay error devuelve el usuario guardado sino devuelve el error
    pet.save((err, petStored) => {
        //si existe un error
        /*if (err) return res.status(500).send({message: "Error al guardar el cliente"});
        //si el usuario guardado no existe
        /*if (!customerStored) return res.status(404).send({message: "No se ha registrado el cliente"});
*/
        //si OK devuelve un objeto customer con los datos guardados en la bdat
        res.status(200).send({pet: petStored});

    });


}

//export las funciones

module.exports = {
		savePet,
		getPets,
		getPet
};