var db = require('../db/dbConfig');
var ProjectKeyword = require('../models/projectKeywordModel');

var ProjectKeywords = new db.Collection();

ProjectKeywords.model = ProjectKeyword;

module.exports = ProjectKeywords;

