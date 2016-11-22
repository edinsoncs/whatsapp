var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	//res.send('bienvenido al home');
	res.render('inicio', {
		title: 'Whatssap',
		seo: 'mis palabras para posicionar'
	});
});



module.exports = router;