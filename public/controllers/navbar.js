(function(angular){
	"use strict";
	var mi = angular.module('MyApp');

	mi.controller('NavbarCtrl', ['$scope', 'Auth', function($scope, Auth){
		$scope.logout = function() {
			Auth.logout();
		};
	}]);

})(angular);