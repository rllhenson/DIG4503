'use strict';

//Setting up route
angular.module('stories').config(['$stateProvider',
	function($stateProvider) {
		// Stories state routing
		$stateProvider.
		state('stories', {
			url: '/story',
			templateUrl: 'modules/stories/views/stories.client.view.html'
		});
	}
]);