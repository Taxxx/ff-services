module.exports = function(app) {

	var Event;
	var findAllEvents;
	var findEventById;
	var addEvent;
	var updateEvent;
	var deleteEvent;

	Event = require('../models/event.js');

  	//GET - Return all events in the DB
	findAllEvents = function(req, res) {
		//debugger;
		Event.find(function(err, events) {
			if(!err) {
				console.log('GET /events');
				//console.log(events);
				res.send(events);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a Event with specified ID
	findEventById = function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			if(!err) {
				console.log('GET /event/' + req.params.id);
				res.send(event);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Event in the DB
	addEvent = function(req, res) {

		var event = new Event({
			name: 				req.body.name,
			description: 		req.body.description,
			event_date: 		req.body.event_date,
			confirmation_date: 	req.body.confirmation_date,
			id_category_event: 	req.body.id_category_event
	  	});

		event.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

        res.send(event);
	};

	//PUT - Update a event register already exists
	updateEvent = function(req, res) {
		Event.findById(req.params.id, function(err, event) {

			event.name = req.body.name;
			event.description = req.body.description;
			event.event_date = req.body.event_date;
			event.confirmation_date = req.body.confirmation_date;
			event.id_category_event = req.body.id_category_event;

			event.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(event);
			});
		});
	};

	//DELETE - Delete a Event with specified ID
	deleteEvent = function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			event.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(event);
			})
		});
	};

	//Link routes and functions
	app.get('/events', findAllEvents);
	app.get('/event/:id', findEventById);
	app.post('/event', addEvent);
	app.put('/event/:id', updateEvent);
	app.delete('/event/:id', deleteEvent);
};