var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var monk = require('monk');	
var db = monk('localhost:27017/whatssap');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var flash = require('connect-flash');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(function(req, res, next){
	req.db = db;
	console.log('conectado a la database');
	next();
});

app.use(cookieParser('hola'));
app.use(session({ secret: '123' }));
app.use(flash());

//var conectandome = require('puerto');

var home = require('./routes/inicio');
var demo = require('./routes/index');
var register = require('./routes/register');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//staticos en nodejs
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', home);
app.use('/demo', demo);

app.use('/register', register);

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


server.listen('80', function(){
	console.log('el servidor esta corriendo');
});






