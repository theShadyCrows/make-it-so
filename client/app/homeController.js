angular.module('makeitso.home', [])

	.controller('homeController', function($scope, $http){
		
		$scope.data = {};

		$scope.getBounties = function(){
			console.log("getBounties() called!!!!")

			// myFactory.getAll()
			// 	.then(function (bounties){
			// 		console.log("homeController getAll() call");
			// 		$scope.data.bounties = bounties;


			// 	})
			// 	.catch(function(error){
			// 		console.error(error);

			// 	})

			
		}		
	})