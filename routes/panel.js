'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

	res.render('panel', {
		title: 'Panel - Dotut',
		use: req.user
	});

});

router.get('/create', (req, res, next) => {

	res.render('create', {
		title: 'Crear Perfil - Dotut',
		use: req.user
	});

});


router.get('/myfn', (req, res, next) => {

		if(req.user.fn) {
			res.render('my', {
				title: 'Mi Fundacion: ' + req.user.fn[0].name,
				use: req.user
			});

		} else {
			res.redirect('/panel');
		}

});

router.get('/donation', (req, res, next) => {

	res.render('donation', {
		title: 'Mis Donaciones - Dotut',
		use: req.user
	});

});

module.exports = router;