var express = require('express');
var router = express.Router();
var flash = require('req-flash');

router.post('/', function(req, res, next){

	var db = req.db;
	var usuarios = db.get('usuarios');

	usuarios.insert({
		'username': req.body.username,
		'password': req.body.password 
	}, function(err, data){
		if(err) return err;
		req.flash('info', 'Se ha creado la sesión flash!');
		res.redirect('/');
	});

});

module.exports = router;