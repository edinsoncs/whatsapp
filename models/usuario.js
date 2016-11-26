var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario = new Schema({
	'username': String,
	'password': String,
	'avatar': String,
	'idsocket': String,
	'status': String
}, {
	collection: 'usuarios'
});

var modelUsuario = mongoose.model('model', usuario);