angular.module('makeitso', [
	'makeitso.form', 
	'makeitso.home',
	'ngRoute'
])

.config(function($routeProvider, $httpProvider){
	$routeProvider
	.when('/home', {
		templateUrl: 'app/views/home.html',
		// templateUrl: 'app/home.html',
		controller: 'homeController'
	})
	.when('/form', {
		templateUrl: 'app/form.html',
		controller: 'formController'
	})
	.otherwise({
		redirectTo: '/home'
	});
});