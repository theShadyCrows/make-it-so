// var controller = require('./controllers');
var db = require('./db/index.js');
var router = require('express').Router();
// var path = require('path');
//Connect controller methods to their corresponding routes
var Projects = require ('./controllers/projectsCollection.js')
router.get('/test', function (req, res) {
	console.log("succesful get:");//, db.knex.select("name").from("Projects"));
	res.end("testget");
});

router.post('/test', function (req, res) {
	console.log("succesful post", req.body.name);
	Projects.create({
		name: req.body.name
	})

	// knex('Projects').insert({name: "testname"});
	res.send(req.body);
});

module.exports = router;
