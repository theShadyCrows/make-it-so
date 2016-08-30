var db = require('../db/index.js');
var Project = require('../models/project.js');

var Projects = new db.Collection();

Projects.model = Project;

module.exports = Projects;

