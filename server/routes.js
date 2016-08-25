var controller = require('./controllers');
var router = require('express').Router();
// var path = require('path');
//Connect controller methods to their corresponding routes
router.get('/*', function (req, res) {
	console.log("succesful get")
	res.end("testget")
});

router.post('/*', function (req, res) {
	console.log(req.baseUrl)
	res.end("testpost");
});

module.exports = router;
