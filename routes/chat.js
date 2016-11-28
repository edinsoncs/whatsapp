var express = require('express');
var router = express.Router();

var formfiles = require('connect-multiparty');
var formfilesMiddleware = formfiles();

var shortid = require('shortid');

const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
	
	var db = req.db;
	var usuarios = db.get('usuarios');
	var dashboard = db.get('dashboard');

	usuarios.find({}, function(err, data) {
		if(err){
			return err;
		} else {

			dashboard.find({}, function(e, d){
				res.render('chat', {
					isuser: req.user,
					users: data,
					mensajes: d
				});
				
			})


		}
	})

});

router.post('/savemensajes', function(req, res, next){
	var db = req.db;
	var dashboard = db.get('dashboard');

	console.log(req.body);

	if(req.body.gallery) {
			dashboard.insert({
			'user': req.user.username,
			'fecha': req.body.fecha,
			'message': req.body.message,
			'gallery': req.body.gallery
		}, function(err, doc){
			if(err){
				return err;
			} else {
				res.json({'success': true});
			}
		});
	} else {
		dashboard.insert({
			'user': req.user.username,
			'fecha': req.body.fecha,
			'message': req.body.message
		}, function(err, doc){
			if(err){
				return err;
			} else {
				res.json({'success': true});
			}
		});
	}

	/*
	 */

});

router.post('/savephoto', formfilesMiddleware, function(req, res, next){

	var db = req.db;
	var user = db.get('usuarios');

	var nombre_is_img = shortid.generate() + req.files.avatar.name;

	fs.readFile(req.files.avatar.path, function(err, data){
		if(err){
			return err;
		} else {
			var directorio = path.join(__dirname, '..', 'public', 'avatars/' + nombre_is_img);
			
			fs.writeFile(directorio, data, function(error){
				if(error){
					return error;
				} else {
					
					updateFN();

				}
			});
		}
	});

	function updateFN(){
		user.update({'_id': req.user._id},{
			$set: {
				'avatar': nombre_is_img
			}
		}, function(data){
			res.redirec('/chat');
		});
	}


});


router.post('/savestatus', function(req, res, next){

	const db = req.db;
	const user = db.get('usuarios');

	user.update({'_id': req.user._id}, {
		$set: {
			'status': req.body.mensaje
		}
	}, function(data){
		res.redirect('/chat');
	});


});
module.exports = router;