(function(angular) {
	"use strict";
	var mi = angular.module('MyApp');

	mi.controller('AddCtrl', ['$scope', '$alert', 'Show',
		function($scope, $alert, Show) {
			$scope.addShow = function() {
				var show = new Show({ showName: $scope.showName });
				show.$save(function() {
					$scope.showName = '';
					$alert({
						content: 'TV show has been added.',
						placement: 'top-right',
						type: 'success',
						duration: 3
					});
				});
			};
		}
	]);

})(angular);