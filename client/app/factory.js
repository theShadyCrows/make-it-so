angular.module('makeitso', [])
	.factory('myFactory', function(){
		var getAll = function(){
			return $http({
				method: 'GET',
				url: '/bounties'
			})
			.then(function(resp){
				console.log(resp.data);
				return resp.data;

			})

		}





	})