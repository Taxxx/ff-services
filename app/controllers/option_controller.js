module.exports = function(app) {

	var Option;
	var findAllOptions;
	var findOptionById;
	var addOption;
	var updateOption;
	var deleteOption;

	Option = require('../models/option.js');

  	//GET - Return all Options in the DB
	findAllOptions = function(req, res) {
		//debugger;
		Option.find(function(err, options) {
			if(!err) {
				console.log('GET /options');
				//console.log(options);
				res.send(options);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a Option with specified ID
	findOptionById = function(req, res) {
		Option.findById(req.params.id, function(err, option) {
			if(!err) {
				console.log('GET /option/' + req.params.id);
				res.send(option);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Option in the DB
	addOption = function(req, res) {

		var option = new Option({
			description: req.body.description,
	  	});

		option.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

        res.send(option);
	};

	//PUT - Update a Option register already exists
	updateOption = function(req, res) {
		Option.findById(req.params.id, function(err, option) {

			option.description = req.body.description;

			option.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(option);
			});
		});
	};

	//DELETE - Delete a Option with specified ID
	deleteOption = function(req, res) {
		Option.findById(req.params.id, function(err, option) {
			option.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(option);
			})
		});
	};

	//Link routes and functions
	app.get('/options', findAllOptions);
	app.get('/option/:id', findOptionById);
	app.post('/option', addOption);
	app.put('/option/:id', updateOption);
	app.delete('/option/:id', deleteOption);
};