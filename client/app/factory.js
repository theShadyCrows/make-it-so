angular.module('makeitso', [])
	.factory('myFactory', function(){
		var getAll = function(){
			console.lod("getAll() called!!!!!!!!!!!!!")
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