'use strict'
const express = require('express');
const router = express.Router();

router.get('/fn/:name', (req, res, next) => {

	let db = req.db;
	let fundaciones = db.get('usuarios');

	fundaciones.find({'fn.categoria': req.params.name}, (err, resolv) => {
		if(err) return err;
		
		res.json(resolv);

	});


});

module.exports = router;