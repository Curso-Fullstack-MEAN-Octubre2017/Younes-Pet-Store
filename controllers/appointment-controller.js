'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Appointment = require('../models/appointment');

function getAppointment(req, res) {
	res.send("HOLA")
}
/*
function getAppointmentsByDate(req, res) {
	var startDate = req.params.startDate;
	var endDate = req.params.endDate;
	
	var gridAppointments = {};
	gridAppointments['20171001'] = {};
	gridAppointments['20171001']['09:00'] = {customerName: "Uno", petName: "Otro"};
	gridAppointments['20171001']['10:00'] = {customerName: "asdf", petName: "asdf"};
	
	res.json(gridAppointments);
}
*/

function mapa(dateParcial,hora){
	//var startDate = req.params.startDate;
	//var endDate = req.params.endDate;
	
	var gridAppointments = {};
	gridAppointments[dateParcial] = {};
	gridAppointments[dateParcial][hora] = {customerName: "Uno", petName: "Otro"};
	return gridAppointments;
	
}

//funciones del controlador para recoger datos de la base de datos
function getAppointments(req, res) {
	
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //hoy es 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd;
	} 

	if(mm<10) {
	    mm='0'+mm;
	} 

	today = mm+'/'+dd+'/'+yyyy;
	console.log(today);

	Appointment.find({"date" : {"$gt" : new Date(today)}}, (err, appointments) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        //if (!customers) return res.status(404).send({message: `No existen clientes`});
        //res.json(200, appointments);
        
        for (var i=0; i< appointments.length; i++){
            //Para obtener una objeto de tu lista
            var appointment = appointments[i];
            console.log(appointment.date);
            var date = new Date(appointment.date);
        	var newdd = date.getDate();
        	var newmm = date.getMonth()+1; //hoy es 0!
        	var newyyyy = date.getFullYear();
        	var newhour =date.getHours();
        	var newMinutes =date.getMinutes();
        	if(newdd<10) {
        	    dd='0'+dd;
        	} 

        	if(newmm<10) {
        	    newmm='0'+newmm;
        	} 
        	var dateParcial = newmm+'/'+newdd+'/'+newyyyy;
        	var hora=newhour+':'+newMinutes;
        	date = newmm+'/'+newdd+'/'+newyyyy+'-'+newhour+':'+newMinutes;
        	console.log(mapa(dateParcial,hora));
        	
        	//res.json(mapa(dateParcial,hora));
        }
        
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

    //funcion callback si no hay error devuelve el usuario guardado sino devuelve el error
    appointment.save((err, appointmentStored) => {
        //si existe un error
        /*if (err) return res.status(500).send({message: "Error al guardar el cliente"});
        //si el usuario guardado no existe
        /*if (!customerStored) return res.status(404).send({message: "No se ha registrado el cliente"});
*/
        //si OK devuelve un objeto customer con los datos guardados en la bdat
        res.status(200).send({appointment: appointmentStored});

    });


}


//export las funciones

module.exports = {
	getAppointment,
	//getAppointmentsByDate,
	getAppointments,
	saveAppointment
};