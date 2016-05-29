var mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
	name: 				{ type: String },
	description: 		{ type: String },
	event_date: 		{ type: Date },
	confirmation_date: 	{ type: Date },
	id_category_event: 	{ type: Number }
	
});