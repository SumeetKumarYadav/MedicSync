

var mongoose = require('mongoose')
, Schema = mongoose.Schema;


var userSchema = new Schema({    	  
	  emailId: String,
	  name:	String,
      password: String,
      phone : String,
      specialization:Array
  },{
		collection : 'user',
		versionKey: false 
  });
  
module.exports = mongoose.model('User', userSchema);