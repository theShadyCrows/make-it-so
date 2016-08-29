angular.module("makeitso", [])

	.controller('homeController' function($scope, myFactory){
		
		$scope.data = {};

		var getBounties = function(){

			console.log("getBounties() called!!!!")

			myFactory.getAll()
				.then(function (bounties){
					$scope.data.bounties = bounties;


				})
				.catch(function(error){
					console.error(error);

				})

			
		}

	getBounties();		

	})