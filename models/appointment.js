const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	pet : {type:String,required:true},
	vet : {type:String,required:true},
	date : {type:String,required:true},
	note : {type:String,required:true},
	state : {type:String}		
});
module.exports = mongoose.model("Appointment",appointmentSchema);