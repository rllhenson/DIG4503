'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var crudstories = require('../../app/controllers/crudstories.server.controller');

	// Crudstories Routes
	app.route('/crudstories')
		// .get(crudstories.listr)
		.get(users.lists)
		.post(users.requiresLogin, crudstories.create);

	app.route('/users').get(users.lists);

	app.route('/crudstories/:userId')
		.get(users.readr)
		.put(users.requiresLogin, crudstories.hasAuthorization, crudstories.update)
		.delete(users.requiresLogin, crudstories.hasAuthorization, crudstories.delete);

	// Finish by binding the Crudstory middleware
	app.param('crudstoryId', crudstories.crudstoryByID);
};
