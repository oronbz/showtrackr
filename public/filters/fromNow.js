(function(angular){
	"use strict";
	var mi = angular.module('MyApp');

	mi.filter('fromNow', function() {
		return function(date) {
			return moment(date).fromNow();
		}
	});

})(angular);