angular.module('makeitso', [
	'makeitso.form', 
	'makeitso.home',
	'ngRoute'
	])
	.config(function($routeProvider, $httpProvider){
		$routeProvider
			.when('/form', {
				templateUrl: 'app/form.html',
				controller: 'formController'
			})
			.when('/home', {
				templateUrl: 'app/home.html',
				controller: 'homeController'
			})
			.otherwise({
				redirectTo: '/home'
			})
	})