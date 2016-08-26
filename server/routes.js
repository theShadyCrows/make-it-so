// var controller = require('./controllers');
var router = require('express').Router();
// var path = require('path');
//Connect controller methods to their corresponding routes
router.get('/test', function (req, res) {
	console.log("succesful get");
	res.end("testget");
});

router.post('/test', function (req, res) {
	console.log("succesful post");
	res.end("testpost");
});

module.exports = router;
