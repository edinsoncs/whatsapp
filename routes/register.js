var express = require('express');
var router = express.Router();
var flash = require('req-flash');

router.post('/', function(req, res, next) {

    var db = req.db;
    var usuarios = db.get('usuarios');

    if(req.body.passworda == req.body.passwordb) {

        //Verificamos si el usuario existe
    usuarios.find({ 'email': req.body.email }, function(err, doc) {

        if (doc.length) {
            req.flash('info', 'Ya existe otro usuario con el mismo Email');
            res.redirect('/access');
            res(true);
        } else {
            newUser();
        }

    });


    function newUser() {
        usuarios.insert({
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.passworda
        }, function(err, data) {
            if (err) return err;
            req.flash('su', 'Se creo correctamente su cuenta: ' + req.body.email);
            res.redirect('/access');
        });
    }

    } else {

        req.flash('info', 'Error la contraseña no coinciden');
        res.redirect('/access');

    }


    


});

module.exports = router;