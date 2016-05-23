var express  = require('express');
var https = require('https');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var requirejs = require('requirejs');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/conf.js');

mongoose.connect(configDB.url,  function(err) {
	if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
	}
});

require('./app/models/asteroid');
require('./app/models/group');

app.use(morgan('dev'));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use("/css", express.static(__dirname + '/views/css'));
app.use("/less", express.static(__dirname + '/views/less'));
app.use("/lib", express.static(__dirname + '/views/lib'));
app.use("/models", express.static(__dirname + '/app/models'));
app.use("/controller", express.static(__dirname + '/app/controller'));
app.use("/js", express.static(__dirname + '/app/js'));
app.use("/routes", express.static(__dirname + '/app/routes'));
app.use("/views", express.static(__dirname + '/views'));
app.use("/services", express.static(__dirname + '/app/services'));

require('./app/routes/routes.js')(app);

app.listen(port);
console.log('Server running on port ' + port);
