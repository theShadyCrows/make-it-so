angular.module('makeitso', [
	'makeitso.form', 
	'makeitso.home',
	'ui.router'
	// 'ngRoute'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
  	url: '/home',
  	views: {
  		'': {
	  		templateUrl: 'app/views/home.html',
				// templateUrl: 'app/home.html',
				controller: 'homeController'
  		},
  		'widgets@home': {
  			url: '/home',
  			templateUrl: 'app/views/widgets.html',
				controller: 'homeController'
  		}
  	}
  })
  .state('form', {
  	url: '/form',
		// templateUrl: 'app/views/form.html',
		templateUrl: 'app/form.html',
		controller: 'formController'
  });
});

// .config(function($routeProvider, $httpProvider){
// 	$routeProvider
// 	.when('/home', {
// 		templateUrl: 'app/views/home.html',
// 		// templateUrl: 'app/home.html',
// 		controller: 'homeController'
// 	})
// 	.when('/form', {
// 		templateUrl: 'app/form.html',
// 		controller: 'formController'
// 	})
// 	.otherwise({
// 		redirectTo: '/home'
// 	});
// });