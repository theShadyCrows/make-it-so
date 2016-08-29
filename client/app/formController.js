angular.module('shortly.shorten', []) // idk what to call this

.controller('formController', function () {

// I think I need to submit the data from ea field in the form to the $scope and then on submit button click transfer the entered data to the,


  $scope.link = {};
  $scope.addLink = function () {
    $scope.loading = true;
    Links.addOne($scope.link)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  });
