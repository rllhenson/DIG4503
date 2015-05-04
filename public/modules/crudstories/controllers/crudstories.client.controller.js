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
				// Socket.emit('news', { hello: 'world' });
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
		// $scope.update = function() {
		// 	var crudstory = $scope.crudstory;

		// 	crudstory.$update(function() {
		// 		$location.path('crudstories/' + crudstory._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };


		// Update existing Crudstory
		$scope.updateAuthor = function() {
			var crudstory = $scope.crudstory;

			var username = $scope.items[0].question;
			// var username2 = $scope.items[1].question;

			// $scope.crudstory.user.push({
			// 	username: username
			// 	// ,
			// 	// _id: 1
			// });
			// $scope.crudstory.user.push({
			// 	username: username2,
			// 	_id: 2
			// });

			// this yells at me and says it isn't a thing
			// crudstory.push({
			// 	user: $scope.crudstory.user[1]
			// });

			// get username from input and push to crudstory.user[]
			// can queryying happen with the username to get the id? do I need the user id?
			// adding an id doesn't make it any more permanent
			// addtoset does nothing
			// apparently .insert() isn't a function
			// naming this function just 'update' instead of 'updateAuthor' doesn't make it any more permanent - I thought maybe it was a routing issue, but that would've fixed it yeah?
			$scope.crudstory.user.push({
				username: username
			});

			var cruduser = $scope.crudstory.user;
			console.log("username: "+username);
			// console.log("crudstory: "+$scope.crudstory.title+" "+$scope.crudstory.story+" "+$scope.crudstory.user[0].username+" "+$scope.crudstory.user[1].username);
			console.log("current number of users: "+$scope.crudstory.user);
			console.log("current users: "+$scope.crudstory.user[0].username+" "+$scope.crudstory.user[1].username /*+" "+$scope.crudstory.user[2].username*/);

			// add to set makes no difference
			$scope.crudstory.$update(function () {
			// 	{$addToSet: {user: [ username, username2 ] }},

			// function() {
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