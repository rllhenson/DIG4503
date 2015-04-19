'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('crudstories/:userId', { userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);