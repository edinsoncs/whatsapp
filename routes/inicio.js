var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	//res.send('bienvenido al home');
	res.render('inicio', {
		title: 'Whatssap',
		seo: 'mis palabras para posicionar'
	});
});
router.get('/:id', function(req, res, next){
	var nombre = req.params.id;
	res.send('Por que lees mi code?');
});


module.exports = router;