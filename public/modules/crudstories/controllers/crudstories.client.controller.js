'use strict';

// Crudstories controller
angular.module('crudstories').controller('CrudstoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Socket', 'Crudstories',
	function($scope, $stateParams, $location, Authentication, Socket, Crudstories) {
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


		// Update existing Crudstory
		$scope.updateAuthor = function() {
			var crudstory = $scope.crudstory;

			var username = $scope.items[0].question;
			// get username from input and push to crudstory.user[]
			// can queryying happen with the username to get the id? do I need the user id?

			$scope.crudstory.user.push({
				username: username
			});

			console.log("username: "+username);
			console.log("current number of users: "+$scope.crudstory.user);
			console.log("current users: "+$scope.crudstory.user[0].username+" "+$scope.crudstory.user[1].username);

			crudstory.$update(function() {
				$location.path('crudstories/' + crudstory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.cancel = function() {
			var crudstory = $scope.crudstory;
			console.log("current number of users: "+$scope.crudstory.user);
			console.log("current users: "+$scope.crudstory.user[0]+" "+$scope.crudstory.user[1]);
			$location.path('crudstories/' + crudstory._id);
		}

		// http://jsbin.com/fusapojo/4/edit?html,output
		$scope.items = [];
        $scope.usernum = 1;

        $scope.add = function () {
          $scope.items.push({ 
            question: "",
            questionPlaceholder: $scope.usernum
          });
          $scope.usernum += 1;
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


			// var crudstory = $scope.crudstory;

			// console.log("current users: "+crudstory.user[0]);
		};

	}
]);