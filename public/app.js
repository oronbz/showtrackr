(function(angular){
	"use strict";
	var mi = angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap']);

	mi.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'MainCtrl'
			})
			.when('/shows/:id', {
				templateUrl: 'views/detail.html',
				controller: 'DetailCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/signup', {
				templateUrl: 'views/signup.html',
				controller: 'SignupCtrl'
			})
			.when('/add', {
				templateUrl: 'views/add.html',
				controller: 'AddCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

})(angular);