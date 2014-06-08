(function(angular){
	"use strict";
	var mi = angular.module('MyApp');

	mi.controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth){
		$scope.signup = function() {
			Auth.signup({
				email: $scope.email,
				password: $scope.password
			});
		};
	}]);

})(angular);