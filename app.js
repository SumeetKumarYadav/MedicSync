/**
 * Module dependencies.
 */
var express = require('express'),
	passport = require('passport'), 
	http = require('http'), 
	path = require('path'),
	LocalStrategy = require('passport-local').Strategy, 
	User = require('./models/user.js'),
	fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync('./controllers').forEach(function(file){
	if(file.substr(-3) == '.js'){
		route = require('./controllers/'+file);
		route.controller(app);
	}
});

//create connection pool for MongoDB, just do it once when server has created.
require('./config/db.js').connect();

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.post('/login', passport.authenticate('local', {
	successRedirect : '/home',
	failureRedirect : '/loginFailure'
}));


passport.use(new LocalStrategy(function(username, password, done) {
	process.nextTick(function() {
		User.findOne({
			'emailId' : username
		}, function(err, user) {
			console.log("pass"+user.password);
			if (err)
				return done(err);
			if (!user)
				return done(null, false);
			if (user.password != password)
				return done(null, false);
			return done(null, user);
		});
	});
}));
