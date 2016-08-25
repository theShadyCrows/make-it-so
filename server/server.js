var express = require('express');
var router = require('./routes.js');

var app = express();
app.set('port', 3000);

// configure our server with all the middleware and routing
// require('./config/middleware.js')(app, express);
// require('./routes.js')(app, express);


app.use(express.static(__dirname + '/../client'));

// start listening to requests on port 8000
app.listen(8000);

console.log("listening to 8000")

app.use('/*', router);

// export our app for testing and flexibility, required by index.js
module.exports = app;
