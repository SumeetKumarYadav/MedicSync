
var User = require('../models/user.js');
var login = require('./login');
module.exports.controller = function(app) {
	
	app.get('/',login.index);
	
	app.post('/getspecialization',login.getspecialization);
	
	app.get('/home',login.home);	
	
	app.get('/loginFailure', function(req, res) {
		res.send('Failed to authenticate');
	});
	
	app.post('/signUpAction',login.submitSignUpForm);
	
};

/**
 * This method renders login page
 */
exports.index = function(req, res){
	res.render('login');
};

/**
 * This method renders home page screen on successfull authentication
 */

exports.home = function(req, res){
	res.render('home');
};
/**
 * This method is for binding specialization in sign up form select2. It accepts regex of character typed by user. 
 */

exports.getspecialization = function(req,res){
	var Specialization = require('../models/specialization.js');
	  var str = req.param('regex');
      var replaced = "";
      if (str.length > 0) {
          for (var i = 0; i < str.length; i++) {
              replaced = replaced + str.charAt(i).replace(/\\/, "");
          }
      }		
      var regex = new RegExp([replaced].join(""), "i");
	
	Specialization.find({'area': regex,},function(err,result){
		console.log(JSON.stringify(result));
		res.send(result);
	});
};

exports.submitSignUpForm = function(req,res){
	
	var specialization = [];
	specialization = req.body.specialization.split(',').map(function(spec){
		return parseInt(spec);
	});
	var user = new User({name:req.body.name,emailId:req.body.email,password:req.body.password,specialization:specialization});
	user.save(function(err) {	  
		  if (err) throw err;
		  res.render('home');
		});	
};