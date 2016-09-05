//Hack the NODE_PATH
//https://gist.github.com/branneman/8048520
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var _ = require('lodash');
var path = require('path');

//DB, auth, config init
var nconf = require('nconf');
nconf.file('config.json');

var db = require('db/db');
var auth = require('auth/auth');

//Express
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var authRoutes = require('routes/auth');
var mtgRoutes = require('routes/mtg');

//Express
var app = express();
app.use(bodyParser());
app.use(session({
    secret: nconf.get('sessionSecret'),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Serve the public dir
app.use(express.static(__dirname + '/public'));

//Routes
var loadRoutes = function loadRoutes(routes) {
    _.each(routes, function (rte) {
        app[rte.method](rte.route, rte.fn);
    });
};

loadRoutes(authRoutes);
loadRoutes(mtgRoutes);

//Allow react router to work, needs Express to not intercept random URLs
//TODO: Could do Reacxt SSR and define routes explicitly
app.get('*', function (request, response){
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

//Fire it up
app.listen(process.env.PORT || 8081);