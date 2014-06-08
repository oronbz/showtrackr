(function(angular){
	"use strict";
	var mi = angular.module('MyApp');

	mi.factory('Show', ['$resource', function($resource){
		return $resource('/api/shows/:_id');
	}]);
})(angular);