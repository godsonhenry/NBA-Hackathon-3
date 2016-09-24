angular.module('nba-hackathon', 
	['chartjs', 
	'ngMaterial',
	'ngAria',
	'ngAnimate']
)

.controller("MainCtrl", function($scope) {
	$scope.greeting = "Hello, World!";
});