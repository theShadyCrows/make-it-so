var db = require('./db/index.js');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
var Projects = require ('./collections/projects.js')
var Pledges = require ('./collections/pledges.js')
var Users = require ('./collections/users.js')

router.get('/projects', function (req, res) {
	Projects.reset().fetch()
		.then(function(projects) {
			var finished = [];
			var ret = projects.models;
			var recurse = function(i){
				// console.log(projects.models[i])
				db.knex('Pledges').where({
					"project_id":projects.models[i].id					
				}).select("amount").then(function (amount){
					if(amount.length !== 0) {

						var total = 0;
						for (var q in amount){
							total += amount[q].amount;
						}

						ret[i].attributes.amount = total
					}
					if (++i < ret.length){
						recurse(i);
					} else {
						res.send(ret)
					}
				})
			}
			recurse(0);
		})
	});

router.get('/users', function (req, res) {
	Users.reset().fetch()
		.then(function(users) {
			console.log("user Models", users.models)
			res.send(users.models)
		});

	console.log("succesful get:");//, db.knex.select("name").from("Projects"));
});

router.get('/keywords', function (req, res) {
	Keywords.reset().fetch()
		.then(function(keywords) {
			console.log("keywords models:", keywords.models)
			res.send(keywords.models)
		});

	console.log("succesful get:");//, db.knex.select("name").from("Projects"));
});

router.post('/project', function (req, res) {
  console.log("succesful post to projet:", req.body);
  Projects.create({
  	name: req.body.projectName,
  	timeConstraint: req.body.timeConstraint,
  	wanted: req.body.wanted,
  	description: req.body.description
  }).then(function(attributes){
  	console.log(req.body)
		db.knex('Users').where({
			"username": req.body.username
		}).select('id').then(function(data){
			console.log("********",req.body.pledge);
			var amount = JSON.parse(req.body.pledge);
			var user_id;
			if (data[0] === undefined){
				user_id = 0
			} else {
				user_id = data[0].id
			}
			Pledges.create({
				user_id: user_id,
				project_id: attributes.id,
				amount: amount
			}).then(function(x){
	  		res.send(req.body);
			})
		});
 	});
});

/*
{
	username:[string],
	email:[string]
}
*/
router.post('/users', function (req, res) {
	console.log("succesful post to users", req.body);
	db.knex('Users').insert({
		"email": req.body.email,
		"username": req.body.username
	}).then(function(data){
		console.log(data);
	})
	res.send(req.body);

});

router.post('/keywords', function (req, res) {
	console.log("succesful post to keywords", req.body);
	Keywords.create({
		user_id: req.body.word
	})

	res.send(req.body);
});

/*
{
	username: [string],
	project:[string],
	amount:[int]
}
*/
router.post('/pledges', function (req, res) {

	db.knex('Users').where({
		"username": req.body.username
	}).select('id').then(function(data){
		console.log("********",req.body.pledge);
		var amount = JSON.parse(req.body.pledge);
		Pledges.create({
   		user_id: data[0].id,
      project_id: attributes.id,
      amount: amount
		}).then(function(x){
    	res.send(req.body);
		})
	});

});

module.exports = router;
