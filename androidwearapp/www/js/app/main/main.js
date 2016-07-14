/**
* Main Module
*
* Description
*/
angular.module('main', [])

.service('notifications', ['$resource', 'config', function($resource, config){
	return $resource(config.apiUrl + '/notifications', {}, {
		post: {
			method: 'POST',
			isArray: false
		}
	});
}])

.controller('MainController', ['$scope', '$mdToast', 'notifications', function($scope, $mdToast, notifications){
	$scope.send = function(notification){
		notifications.post(notification, function(res){

		}, function(err){
	        $mdToast.show($mdToast.simple()
	          .position('top right')
	          .textContent(err.data.details));
		});
	}
}])