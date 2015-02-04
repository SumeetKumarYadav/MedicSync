var mongoose = require('mongoose')
, Schema = mongoose.Schema;


var specializationSchema = new Schema({    	  
	  _id: Number,
	  area:	String    
  },{
		collection : 'specialization'
  });
  
module.exports = mongoose.model('Specialization', specializationSchema);