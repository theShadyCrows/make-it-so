angular.module('makeitso.factory', [])
	.factory('myFactory', function($http){
		var getAll = function(){

			console.log("getAll() called!!!!!!!!!!!!!")
			return $http({
				method: 'GET',
				url: '/bounties'
			})
			.then(function(resp){

				console.log("GET response data",resp.data);
				return resp.data;

			})

		}





	})