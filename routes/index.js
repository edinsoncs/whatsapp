var express = require('express');
var router = express.Router();

router.get('/demo', function(req, res, next){
	res.send('hola demo');
});

module.exports = router;