module.exports = function(app) {

	var User;
	var findAllUsers;
	var findById;
	var addUser;
	var updateUser;
	var deleteUser;

	User = require('../models/user.js');

  	//GET - Return all users in the DB
	findAllUsers = function(req, res) {
		//debugger;
		User.find(function(err, users) {
			if(!err) {
				console.log('GET /users');
				//console.log(users);
				res.send(users);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a User with specified ID
	findById = function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if(!err) {
				console.log('GET /user/' + req.params.id);
				res.send(user);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new User in the DB
	addUser = function(req, res) {

		var user = new User({
			name: 		req.body.name,
			nickname: 	req.body.nickname,
			email: 		req.body.email,
			status: 	req.body.status
	  	});

		user.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});

        res.send(user);
	};

	//PUT - Update a user register already exists
	updateUser = function(req, res) {
		User.findById(req.params.id, function(err, user) {

			user.name = req.body.name;
			user.nickname = req.body.nickname;
			user.email = req.body.email;
			user.status = req.body.status;

			user.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(user);
			});
		});
	};

	//DELETE - Delete a User with specified ID
	deleteUser = function(req, res) {
		User.findById(req.params.id, function(err, user) {
			user.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(user);
			})
		});
	};

	//Link routes and functions
	app.get('/users', findAllUsers);
	app.get('/user/:id', findById);
	app.post('/user', addUser);
	app.put('/user/:id', updateUser);
	app.delete('/user/:id', deleteUser);
};