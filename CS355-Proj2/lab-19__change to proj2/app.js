// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var climber_route  = require('./controller/climber');
var route_route  = require('./controller/route');
// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Project 2');

//configure routes
app.use('/route', route_route);
app.use('/climber', climber_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 8001);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));