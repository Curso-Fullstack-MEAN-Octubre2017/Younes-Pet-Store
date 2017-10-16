'use strict';
/*
esta es la clase de lectura y escritura de la parte del cliente 
donde podemos definir o leer los datos de cada cliente nuevo que creamos
 
 */

var Customer = require('../models/customer');

//funciones del controlador para recoger datos de la base de datos
function getCustomers(req, res) {

    Customer.find({}, (err, customers) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        //if (!customers) return res.status(404).send({message: `No existen clientes`});
        res.send(200, customers);
    })
}


function getCustomer(req, res) {
    var id = req.params.id;

    console.log(id);

    Customer.findById(id, (err, customers) => {
        console.log(customers);
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!customers) return res.status(404).send({message: `No existen clientes`});
        res.send(200, customers);
    });
}
//Guardar los datos con el metodo post en la base de datos
function saveCustomer(req, res) {
	
	//instanciar un objeto nuevo para crear nuevo cliente
    var customer = new Customer();
    
    //se guarda los parametros que nos vienen por POST en el body
    //se recoje el cuerpo de la peticion

    //el cuerpo del formulario que vamos a mandar despues con el post
    var params = req.body;
    //console.log('hola3');
    console.log(params);

    customer.dni = params.dni;
    customer.firstName = params.firstName;
    customer.lastName = params.lastName;
    customer.phone = params.phone;
    customer.email = params.email;
    customer.note = params.note;
    

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

function putCustomer(req,res){


        Customer.findOneAndUpdate({_id :req.params.id},req.body,{upsert: true},(err, customerStored) => {
            if (err) {
                console.error(err);
            } else {
            	res.json(customerStored);
            }
        });

  
	
}



//export las funciones

module.exports = {
  saveCustomer,
  getCustomers,
  getCustomer,
  putCustomer
};