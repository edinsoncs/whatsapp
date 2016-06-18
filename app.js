var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//var conectandome = require('puerto');

var home = require('./routes/inicio');
var demo = require('./routes/index');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//staticos en nodejs
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);
app.use('/demo', demo);

var gente = {};
var enlinea = [];

console.log(enlinea);


///////////////////////////////////////


io.on('connection', function(client, username){

	//console.log('cliente conectado');

	//console.log(client.id);
	

	client.on('join', function(data){
		 console.log(`Un usuario se conecto con id:  ${client.id}`)
		 //var pisarId = "${client.id}";
		 //var pis = pisarId.push('-edinson-');
		console.log(data);
		client.emit('mensaje', 'Este mensaje es de nodejs');
	
	});



	client.on('usuario', function(username){

		client.username = username;
		console.log(client.username);

	});

	client.on('mensaje', function(data){


		client.emit('broad', {
			hora: new Date(),
			mensaje: data
		});

		//Detectamos los usuarios que nos escriben
		client.broadcast.emit('broad', {
			hora: new Date(),
			mensaje: data,
			style: 'leyendome'
		});

		
	});

	




});





////////////////////////////////////////



app.use(function(req, res, next){
	var error = new Error('Ocurrio error');
	error.status = 400;
	next(error);
});




server.listen('3000', function(){
	console.log('el servidor esta corriendo');
});






