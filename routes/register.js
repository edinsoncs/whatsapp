var express = require('express');
var router = express.Router();
var flash = require('req-flash');

router.post('/', function(req, res, next) {

    var db = req.db;
    var usuarios = db.get('usuarios');


    //Verificamos si el usuario existe
    usuarios.find({ 'username': req.body.username }, function(err, doc) {

        if (doc.length) {
            req.flash('user', 'Ya existe otro usuario con el mismo Nickname');
           
            res.redirect('/');
             res(true);
        } else {
            newUser();
        }

    });


    function newUser() {
        usuarios.insert({
            'username': req.body.username,
            'password': req.body.password
        }, function(err, data) {
            if (err) return err;
            req.flash('info', 'Se ha creado la sesión flash!');
            res.redirect('/');
        });
    }


});

module.exports = router;
