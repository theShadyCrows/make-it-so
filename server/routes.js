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

/*
{
  username:[string],
  projectName:[string],
  timeConstraint:[string],
  wanted:[string],
  description:[string],
  pledge:[string]
}
NOTE: doesn't send back the id of the project, it instead sends back the id of the newly created pledge
*/

router.post('/project', function (req, res) {
  console.log("succesful post to projet:", req.body);
  Projects.create({
    name: req.body.projectName,
    timeConstraint: req.body.timeConstraint,
    wanted: req.body.wanted,
    description: req.body.description
  }).then(function(project_attributes){
    db.knex('Users').where({
      "username": req.body.username
    }).select('id').then(function(data){
      var amount = JSON.parse(req.body.pledge);
      var user_id;
      //if user does not exists
      if (data[0] === undefined){
        //project id, user id, amount, res
        db.knex('Users').insert({
          "username": req.body.username
        }).then(function(user_id){
          _createPledge(project_attributes.id, user_id, amount, res)
        });
      } else {
        //project id, user id, amount, res
        _createPledge(project_attributes.id, data[0].id, amount, res)
      }
    });
  });
});



/*
{
  username:[string],
}
*/
router.post('/users', function (req, res) {
  db.knex('Users').insert({
    // "email": req.body.email,
    "username": req.body.username
  }).then(function(data){
    console.log("succesful post to users", data);
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
      _createPledge(req.body.project_id, data[0].id, req.body.amount, res)
    } else {
      db.knex('Users').insert({
        "username": req.body.username
      }).then(function(user_id){
        _createPledge(req.body.project_id, user_id, req.body.amount, res);
      })
    }
  })
});

var _createPledge = function(project_id, user_id, amount, res){
  db.knex('Pledges').insert({
    "project_id": project_id,
    "user_id": user_id,
    "amount": amount
  }).then(function(pledgeId){
    console.log(pledgeId);
    res.send(pledgeId); 
  })
}

router.delete('/project/:projectId', function (req, res) {
	db.knex('Projects').where({
   "id": req.params.projectId 
  }).del().then(function(x){
    res.end();
  })
});

module.exports = router;