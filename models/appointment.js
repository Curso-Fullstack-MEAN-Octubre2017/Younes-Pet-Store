const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	pet : {type: Schema.ObjectId,ref:'Pet',required:true},
	vet : {type:String,required:true},
	date : {type:Date,required:true},
	dateEnd : {type:Date,required:true},
	note : {type:String,required:true},
	state : {type:String}		
});
module.exports = mongoose.model("Appointment",appointmentSchema);