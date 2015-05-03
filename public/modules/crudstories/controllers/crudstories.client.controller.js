'use strict';

// Crudstories controller
angular.module('crudstories').controller('CrudstoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Socket', 'Crudstories', 'Users',
	function($scope, $stateParams, $location, Authentication, Socket, Crudstories, Users) {
		$scope.authentication = Authentication;

		// Create new Crudstory
		$scope.create = function() {
			// Create new Crudstory object
			var crudstory = new Crudstories ({
				title: this.title,
				story: this.story
			});

			// Redirect after save
			crudstory.$save(function(response) {
				$location.path('crudstories/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.story = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			Socket.on('crudstory.created', function(crudstory) {
				Socket.emit('news', { hello: 'world' });
		    	console.log(crudstory);
			});
		};

		// Remove existing Crudstory
		$scope.remove = function(crudstory) {
			if ( crudstory ) { 
				crudstory.$remove();

				for (var i in $scope.crudstories) {
					if ($scope.crudstories [i] === crudstory) {
						$scope.crudstories.splice(i, 1);
					}
				}
			} else {
				$scope.crudstory.$remove(function() {
					$location.path('crudstories');
				});
			}
		};

		// Update existing Crudstory
		$scope.update = function() {
			var crudstory = $scope.crudstory;

			crudstory.$update(function() {
				$location.path('crudstories/' + crudstory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Crudstories
		$scope.find = function() {
			$scope.crudstories = Crudstories.query();
		};

		// Find existing Crudstory
		$scope.findOne = function() {
			$scope.crudstory = Crudstories.get({ 
				crudstoryId: $stateParams.crudstoryId
			});
		};

	}
]);