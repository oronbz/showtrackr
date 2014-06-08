(function(angular){
	"use strict";
	var mi = angular.module('MyApp');

	mi.controller('LoginCtrl', ['$scope', 'Auth', function($scope, Auth){
		$scope.login = function() {
			Auth.login({
				email: $scope.email,
				password: $scope.password
			});
		};
	}]);

})(angular);