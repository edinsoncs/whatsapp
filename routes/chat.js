var express = require('express');
var router = express.Router();

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
					data: req.user,
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

	dashboard.insert({
		'user': req.body.user,
		'fecha': req.body.fecha,
		'message': req.body.message
	}, function(err, doc){
		if(err){
			return err;
		} else {
			res.json({'success': true});
		}
	})
});

module.exports = router;