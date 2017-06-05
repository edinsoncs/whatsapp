var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	//res.send('bienvenido al home');
	res.render('inicio', {
		title: 'Dotut',
		seo: 'mis palabras para posicionar'
	});
});

router.get('/access', function(req, res, next) {

	res.render('login', {
		title: 'Dotut - Login',
		seo: 'mis palabras para posicionar'
	})

});



module.exports = router;