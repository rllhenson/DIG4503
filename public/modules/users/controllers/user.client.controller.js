'use strict';

angular.module('users').controller('UserController', ['$scope', '$http', '$stateParams', '$location', 'Users', 'Authentication',
	function($scope, $http, $stateParams, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// Find a list of Users
		$scope.findauthors = function() {
			$scope.users = Users.query();
		};

		// Find existing User
		$scope.findOne = function() {
			$scope.user = Users.get({ 
				userId: $stateParams.userId
			});
		};

		$scope.userByID = function(req, res, next, id) {
			Users.findOne({
				_id: id
			}).exec(function(err, user) {
				if (err) return next(err);
				if (!user) return next(new Error('Failed to load User ' + id));
				req.profile = user;
				next();
			});
		};


		$scope.oneuserByID = function(req, res, next, id) { 
			Users.findById(id).exec(function(err, user) {
				if (err) return next(err);
				if (! user) return next(new Error('Failed to load User ' + id));
				req.user = user ;
				next();
			});
		};
	}
]);