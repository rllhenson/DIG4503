'use strict';

angular.module('users').controller('UserController', ['$scope', '$http', '$stateParams', '$location', 'Users', 'Authentication',
	function($scope, $http, $stateParams, $location, Users, Authentication) {
		$scope.user = user;

		// Find a list of Users
		$scope.find = function() {
			$scope.users = Users.query();
		};

		// Find a list of Users
		$scope.findthis = function() {
			$scope.users = Users.query(user._id);

			// $scope.user = Users.get({ 
			// 	userId: $stateParams.userId
			// });
			console.log(userId);
		};

		// Find existing User
		$scope.findOne = function() {
			$scope.user = Users.get({ 
				userId: $stateParams.userId
			});
		};
	}
]);