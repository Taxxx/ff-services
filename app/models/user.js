var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: 		{ type: String },
	nickname: 	{ type: String },
	email: 		{ type: String },
	status: 	{ type: Number }
	
});