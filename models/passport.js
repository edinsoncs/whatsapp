var mongoose = require('mongoose');
var usuario = mongoose.model('model');

var local = require('passport-local').Strategy;

module.exports = function(passport){
	
	//Serializamos el usuario y almacenaremos en la session
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	//Deserializamos el objeto usuario almacenado e nla session
	passport.deserializeUser(function(id, done){
		usuario.findById(id, function(err, user){
			done(err, user);
		});
	});


	//Configuramos el login del usuario LOCAL
	passport.use(new local({
		usernameField: 'username',
		passwordField: 'password'
	}, function(username, password, done){
		process.nextTick(function(){
    		usuario.findOne({
    			'username': username,
    			'password': password
    		}, function(err, user) {
    			if(err) {
    				return done(err)
    			}
    			if(!user) {
    				return done(null, false);
    			}
    			if(user.password != password) {
    				return done(null, false);
    			}
    			return done(null, user);
    		});
    	});

	}));

}