angular.module('makeitso', [])

.controller('formController', function ($scope, $http) {

  $scope.user = {};

// this is the function that accepts the user's inputs to the form on the 
// form.html page, then assigns them to the $scope.user object and then
// converts the object to JSON to be passed to the Express server & the database

  $scope.submit = function() {
    $scope.user.username = username;
    $scope.user.email = email;
    $scope.user.projectName = projectName;
    $scope.user.timeConstraint = timeConstraint;
    $scope.user.wanted = wanted;
    $scope.user.description = description;
    $scope.user.pledge = pledge;
  
    console.log('*** user info in $scope - - >', $scope.user);
  
    var stringifiedScope = JSON.stringify($scope.user);
    console.log(' -- stringifiedScope -->', stringifiedScope);

    $http({
      method: 'POST',
      url: 'http://localhost:8000',
      Content-Type: 'application/json',
      data: stringifiedScope
    })
    .then(function() {
      console.log('user information submitted successfully');
    })
    .catch(function() {
      console.log('user information not submitted');
    });

  // should there be some code here to reset the form?

  };
});

