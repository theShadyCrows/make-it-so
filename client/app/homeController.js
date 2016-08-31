angular.module('makeitso.home', [])

	.controller('homeController', function($scope, $http){
		
		$scope.data = [];

		$scope.getBounties = function(){
			console.log("getBounties() called!!!!")


			$http({
     			'method': 'GET',
     			'url': '/projects',
     			'Content-Type': 'application/json'
   			})
			.success(function(response){
				
				$scope.data = response;
				console.log("Success!!!! scope.data: ", $scope.data);


			}).error(function(error){
				console.log(error);

			})		
		}	

		$scope.values = {};
		$scope.contribute = function(values, id){
			$scope.values.username = values.username;
			$scope.values.amount = values.amount;
			$scope.values.project_id = id;

 			var stringifiedScope = JSON.stringify($scope.values);
			$http({
				'method': 'POST',
     		'url': '/pledges',
     		'Content-Type': 'application/json',
     		'data': stringifiedScope
   			})
			.then(function(){
				console.log('post to pledges went through, all vals:', stringifiedScope);
				$scope.getBounties();
			})
			.catch(function(error){
				console.log('error submitting post to pledges', error)
			});
		}

		$scope.claim = function(id){
			$http.delete('/project', id)
			.then(function(response){
				console.log('project is deleted!',response);
			})
			.catch(function(error){
				console.log(error);
			})
		}

	})