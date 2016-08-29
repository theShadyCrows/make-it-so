angular.module("makeitso.pledge", [])

  .controller('pledgeController', ['$scope', '$http', function($scope, $http){
    $scope.pledges = {};

    var submitPledge = function(data){
      console.log("submitting pledge");
      $http({
        method: 'POST',
        url: '/pledge',
        data: data
      }).then(function (response) {
        console.log('data',data);
        console.log('response', response);
        scope.data = response.data;
        return response.data;
        }).catch(function (error) {
          console.log(error);
        });
    }
  }]);