module.exports = function(app) {

	var Group;
	var findAllGroups;
	var findGroupById;
	var addGroup;
	var updateGroup;
	var deleteGroup;

	Group = require('../models/group.js');

  	//GET - Return all Groups in the DB
	findAllGroups = function(req, res) {
		//debugger;
		Group.find(function(err, groups) {
			if(!err) {
				console.log('GET /groups');
				//console.log(groups);
				res.send(groups);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a Group with specified ID
	findGroupById = function(req, res) {
		Group.findById(req.params.id, function(err, group) {
			if(!err) {
				console.log('GET /group/' + req.params.id);
				res.send(group);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Group in the DB
	addGroup = function(req, res) {

		var group = new Group({
			name: 				req.body.name,
			description: 		req.body.description,
			id_category_event: 	req.body.id_category_event,
			status: 			req.body.status,
			register_date: 		req.body.register_date
	  	});

		group.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

        res.send(group);
	};

	//PUT - Update a Group register already exists
	updateGroup = function(req, res) {
		Group.findById(req.params.id, function(err, group) {

			group.name = req.body.name;
			group.description = req.body.description;
			group.id_category_event = req.body.id_category_event;
			group.status = req.body.status;
			group.register_date = req.body.register_date;

			group.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(group);
			});
		});
	};

	//DELETE - Delete a Group with specified ID
	deleteGroup = function(req, res) {
		Group.findById(req.params.id, function(err, group) {
			group.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(group);
			})
		});
	};

	//Link routes and functions
	app.get('/groups', findAllGroups);
	app.get('/group/:id', findGroupById);
	app.post('/group', addGroup);
	app.put('/group/:id', updateGroup);
	app.delete('/group/:id', deleteGroup);
};