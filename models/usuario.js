var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario = new Schema({
	'name': String,
	'email': String,
	'password': String,
	'avatar': String,
	'idsocket': String,
	'status': String,
	'fn':  Array
}, {
	collection: 'usuarios'
});

var modelUsuario = mongoose.model('model', usuario);