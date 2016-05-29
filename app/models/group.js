var mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
	name: 				{ type: String },
	description: 		{ type: String },
	id_category_event: 	{ type: Number },
	status:				{ type: Number },
	register_date: 		{ type: Date }
	
});