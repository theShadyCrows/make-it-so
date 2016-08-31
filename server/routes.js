var db = require('./db/index.js');
var router = require('express').Router();

//Connect collections methods to their corresponding routes
var Projects = require ('./collections/projects.js')
var Pledges = require ('./collections/pledges.js')
var Users = require ('./collections/users.js')
var Keywords = require ('./collections/keywords.js')

/*
  returns an array of all the projects
*/
router.get('/projects', function (req, res) {
  Projects.reset().fetch()
    .then(function(projects) {
      var finished = [];
      var ret = projects.models;
      //this recurse function is basically a for loop
      //but that waits for the promises to finish before
      //starting a new iteration of the loop
      var recurse = function(i){
        // console.log(projects.models[i])
        db.knex('Pledges').where({
          "project_id":projects.models[i].id          
        }).select("amount").then(function (amounts){
          if(amounts.length !== 0) {
            var total = 0;
            for (var q in amounts){
              total += amounts[q].amount;
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

/*
  return an array of all the users
*/
router.get('/users', function (req, res) {
  Users.reset().fetch()
    .then(function(users) {
      res.send(users.models)
      console.log("succesful users get:");
    });

});

/*
  returns an array of all the keywords
*/
router.get('/keywords', function (req, res) {
  Keywords.reset().fetch()
    .then(function(keywords) {
      res.send(keywords.models)
      console.log("succesful keywords get:");
    });

});

router.post('/project', function (req, res) {
  console.log("succesful post to projet:", req.body);
  Projects.create({
    name: req.body.projectName,
    timeConstraint: req.body.timeConstraint,
    wanted: req.body.wanted,
    description: req.body.description
  }).then(function(attributes){
    db.knex('Users').where({
      "username": req.body.username
    }).select('id').then(function(data){
      var amount = JSON.parse(req.body.pledge);
      var user_id;
      //if user does not exists
      if (data[0] === undefined){
        user_id = 1
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
  db.knex('Users').insert({
    "email": req.body.email,
    "username": req.body.username
  }).then(function(data){
    console.log("succesful post to users", req.data);
    res.send(req.body);
  })
});

/*
{
  word:[string]
}
*/
router.post('/keywords', function (req, res) {
  db.knex('Keywords').insert({
    "word":req.body.word
  }).then(function(data){
    console.log("succesful post to keywords:", data);
    res.send(req.body); 
  })
});

/*
{
  project_id: [int],
  username:[string],
  amount:[int]
}
*/
router.post('/pledges', function (req, res) {

  db.knex('Users').where({
    "username": req.body.username
  }).select('id').then(function(data){
    var user_id;
    if (data.length !== 0){
      user_id = data[0].id;
    } else {
      user_id = 1;    
    }
    db.knex('Pledges').insert({
      "project_id": req.body.project_id,
      "user_id": user_id,
      "amount":req.body.amount
    }).then(function(pledgeId){
      console.log(pledgeId);
      res.send(pledgeId); 
    })
  })
});

router.delete('/project', function (req, res) {
	console.log('in delete with request:', req)
  db.knex('Projects').where({
   "id": req.body.project_id 
  }).del().then(function(x){
    res.end();
  })

});

module.exports = router;