const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const petSchema = new Schema({
	name : {type:String,required:true},
	birthDate : {type:String,required:true},
	picture : {type:String,required:true},
	especie : {type:String,required:true},
	raza : {type:String},
	idClient: {type:String,required:true}
});
module.exports = mongoose.model("Pet",petSchema);