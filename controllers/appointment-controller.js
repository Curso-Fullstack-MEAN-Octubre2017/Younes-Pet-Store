'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Appointment = require('../models/appointment');
var Pet = require('../models/pet');
var moment = require('moment');


function getAppointmentsByDate(req, res) {
	var startDateParam = req.params.startDate;
	var endDateParam = req.params.endDate;
	var startDate = moment(startDateParam, 'YYYYMMDD'); 
	var endDate = moment(endDateParam, 'YYYYMMDD'); 
	
	console.log("getAppointmentsByDate ", startDate.format(), endDate.format());
	
	Appointment.find({"date" : {"$gte" : startDate,"$lt" : endDate}}, (err, appointments) => {
        if (err) {
        	return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        }
        
        var appointmentsByDate = {};
        for (var i=0; i< appointments.length; i++){
        	var appointment = appointments[i];
            var date = moment(appointment.date).format('YYYY-MM-DD');
            var time = moment(appointment.date).format('hh:mm');
            if(appointmentsByDate[date] == undefined) {
        		appointmentsByDate[date] = {}
        	}
        	appointmentsByDate[date][time] = appointment;
        	
        }
        return res.json(appointmentsByDate);
	}).populate({
        path:'pet',
        model:'Pet',
        select:'name especie'
        
    });
}



//funciones del controlador para recoger datos de la base de datos
function getAppointments(req, res) {
	
	Appointment.find({}, (err, appointments) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        res.json(appointments);
               
    })
}

//funciones del controlador para recoger datos de la base de datos
function getAppointment(req, res) {
	var id = req.params.id;

    console.log(id);

    Appointment.findById(id, (err, appointment) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        res.json(appointment);
               
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

    appointment.pet = params.pet;
    appointment.vet = params.vet;
    appointment.date = params.date;
    appointment.note = params.note;
    appointment.state = params.state;
    appointment.dateEnd = params.dateEnd;

    //funcion callback si no hay error devuelve el usuario guardado sino devuelve el error
    appointment.save((err, appointmentStored) => {
        //si existe un error
        /*if (err) return res.status(500).send({message: "Error al guardar el cliente"});
        //si el usuario guardado no existe
        /*if (!customerStored) return res.status(404).send({message: "No se ha registrado el cliente"});
*/
        //si OK devuelve un objeto customer con los datos guardados en la bdat
        res.status(200).send({appointmentStored});

    });


}

//export las funciones

module.exports = {
	getAppointmentsByDate,
	getAppointments,
	saveAppointment,
	getAppointment
	
};