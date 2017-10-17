'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Customer = require('../models/customer');

//funciones del controlador para recoger datos de la base de datos
function getAppointment(req, res) {

    Customer.find({}, (err, customers) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        //if (!customers) return res.status(404).send({message: `No existen clientes`});
        res.send(200, customers);
    })
}

//Guardar los datos con el metodo post en la base de datos
function saveAppointment(req, res) {
	
	//instanciar un objeto nuevo para crear nuevo cliente
    var appointment = new Appointment();
    
    //se guarda los parametros que nos vienen por POST en el body
    //se recoje el cuerpo de la peticion

    //el cuerpo del formulario que vamos a mandar despues con el post
    var params = req.body;
    //console.log('hola3');
    console.log(params);

    appointment.pet = params.dni;
    appointment.vet = params.firstName;
    appointment.date = params.lastName;
    appointment.note = params.phone;
    appointment.state = params.email;

    //funcion callback si no hay error devuelve el usuario guardado sino devuelve el error
    customer.save((err, customerStored) => {
        //si existe un error
        /*if (err) return res.status(500).send({message: "Error al guardar el cliente"});
        //si el usuario guardado no existe
        /*if (!customerStored) return res.status(404).send({message: "No se ha registrado el cliente"});
*/
        //si OK devuelve un objeto customer con los datos guardados en la bdat
        res.status(200).send({customer: customerStored});

    });


}


//export las funciones

module.exports = {
	getAppointment,
	saveAppointment
};