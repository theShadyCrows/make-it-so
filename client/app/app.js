angular.module('makeitso', ['ngRoute'])
	.config(function($routeProvider){
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