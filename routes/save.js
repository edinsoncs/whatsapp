'use strict'

const express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

let formfiles = require('connect-multiparty');
let formfilesMiddleware = formfiles();

var shortid = require('shortid');


router.post('/perfil', formfilesMiddleware, (req, res, next) => {

	var db = req.db;
	var usuarios = db.get('usuarios');

	var logo = req.files.logo.path;
	var bg = req.files.bg.path;

	if(req.files.logo.size && req.files.bg.size) {

		var _nameLogo = shortid.generate() + req.files.logo.name;
		var _bgMarca = shortid.generate() + req.files.bg.name

		fs.readFile(logo, (err, buffer) => {

			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _nameLogo);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return err;
			});

		});


		fs.readFile(bg, (err, buffer) => {
			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _bgMarca);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return error;
			})

		});



				usuarios.findOneAndUpdate({'_id': req.user._id}, {
					$push: {
						'fn': {
							'name': req.body.name,
							'tipo': req.body.tipo,
							'pais': req.body.pais,
							'ciudad': req.body.ciudad,
							'categoria': req.body.categoria,
							'logo': _nameLogo,
							'bg': _bgMarca,
							'video': req.body.video,
							'somos': req.body.somos,
							'hacemos': req.body.hacemos,
							'phone': req.body.phone,
							'email': req.body.email,
							'web': req.body.web,
							'update': new Date(),
							'donaciones': Array,
							'cantidad': Array
						}
					}
				}, (err, suc) => {
					if(err) { return err };
					req.flash('success', 'Se creo correctamente tu perfil, en estos momentos podras encontrarlo en la aplicación Android - Ios, si te equivocastes en alguna información lo podras editar y actualizar, por cualquier incoveniente o consulta no dude en escribirnos: info@dotut.org');
					res.redirect('/panel');
				});
		

	} else {

		req.flash('err', 'Cargue el background y logo de su marca');
		res.redirect('/panel/create');

	}


});

router.post('/update', formfilesMiddleware, (req, res, next) => {

	var db = req.db;
	var usuarios = db.get('usuarios');

	var logo = req.files.logo.path;
	var bg = req.files.bg.path;


	if(req.files.logo.name && req.files.bg.name) {

		var _nameLogo = shortid.generate() + req.files.logo.name;
		var _bgMarca = shortid.generate() + req.files.bg.name

		fs.readFile(logo, (err, buffer) => {

			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _nameLogo);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return err;
			});

		});


		fs.readFile(bg, (err, buffer) => {
			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _bgMarca);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return error;
			})

		});



		usuarios.findOneAndUpdate({'_id': req.user._id}, {
					$set: {
						'fn': {
							'name': req.body.name,
							'tipo': req.body.tipo,
							'pais': req.body.pais,
							'ciudad': req.body.ciudad,
							'categoria': req.body.categoria,
							'logo': _nameLogo,
							'bg': _bgMarca,
							'video': req.body.video,
							'somos': req.body.somos,
							'hacemos': req.body.hacemos,
							'phone': req.body.phone,
							'email': req.body.email,
							'web': req.body.web,
							'update': new Date(),
							'donaciones': Array,
							'cantidad': Array
						}
					}
			}, (err, suc) => {
					if(err) { return err };
					req.flash('success', 'Se actualizo correctamente el perfil.');
					res.redirect('/panel');
		});

	}

	else if(req.files.bg.name) {

		var _bgMarca = shortid.generate() + req.files.bg.name

		fs.readFile(bg, (err, buffer) => {
			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _bgMarca);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return error;
			})

		});

		usuarios.findOneAndUpdate({'_id': req.user._id}, {
					$set: {
						'fn': {
							'name': req.body.name,
							'tipo': req.body.tipo,
							'pais': req.body.pais,
							'ciudad': req.body.ciudad,
							'categoria': req.body.categoria,
							'bg': _bgMarca,
							'logo': req.user.fn[0].logo,
							'video': req.body.video,
							'somos': req.body.somos,
							'hacemos': req.body.hacemos,
							'phone': req.body.phone,
							'email': req.body.email,
							'web': req.body.web,
							'update': new Date()
						}
					}
			}, (err, suc) => {
					if(err) { return err };
					req.flash('success', 'Se actualizo correctamente el perfil.');
					res.redirect('/panel');
		});

	}

	else if(req.files.logo.name) {

		var _nameLogo = shortid.generate() + req.files.logo.name;

		fs.readFile(logo, (err, buffer) => {

			if(err) return err;

			//save
			let directory = path.join(__dirname, '..', 'public', 'files/' + _nameLogo);

			fs.writeFile(directory, buffer, (error) => {
				if(error) return err;
			});

		});


		usuarios.findOneAndUpdate({'_id': req.user._id}, {
					$set: {
						'fn': {
							'name': req.body.name,
							'tipo': req.body.tipo,
							'pais': req.body.pais,
							'ciudad': req.body.ciudad,
							'categoria': req.body.categoria,
							'logo': _nameLogo,
							'bg': req.user.fn[0].bg,
							'video': req.body.video,
							'somos': req.body.somos,
							'hacemos': req.body.hacemos,
							'phone': req.body.phone,
							'email': req.body.email,
							'web': req.body.web,
							'update': new Date()
						}
					}
			}, (err, suc) => {
					if(err) { return err };
					req.flash('success', 'Se actualizo correctamente el perfil.');
					res.redirect('/panel');
		});

	}

	 else {

		usuarios.findOneAndUpdate({'_id': req.user._id}, {
					$set: {
						'fn': {
							'name': req.body.name,
							'tipo': req.body.tipo,
							'pais': req.body.pais,
							'ciudad': req.body.ciudad,
							'categoria': req.body.categoria,
							'video': req.body.video,
							'somos': req.body.somos,
							'hacemos': req.body.hacemos,
							'phone': req.body.phone,
							'email': req.body.email,
							'web': req.body.web,
							'update': new Date()
						}
					}
				}, (err, suc) => {
					if(err) { return err };
					req.flash('success', 'Se actualizo correctamente el perfil.');
					res.redirect('/panel');
		});

	}

})

module.exports = router;