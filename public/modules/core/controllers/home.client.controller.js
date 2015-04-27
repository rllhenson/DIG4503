'use strict';

// Crudstories controller
angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Crudstories', 'Sockets',
	function($scope, $stateParams, $location, Authentication, Crudstories, Sockets) {
		$scope.authentication = Authentication;

		// Find a list of Crudstories
		$scope.find = function() {
			$scope.crudstories = Crudstories.query();
		};

		$scope.quantity = 5;
	}
]);