const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const petSchema = new Schema({
	name : {type:String,required:true},
	birthDate : {type:Date,required:true},
	picture : {type:String},
	shipNumber : {type:String},
	especie : {type:String,required:true},
	raza : {type:String},
	idClient: {type: Schema.ObjectId,required:true}
});
module.exports = mongoose.model("Pet",petSchema);