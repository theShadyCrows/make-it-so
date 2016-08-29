angular.module('makeitso.form', [])

.controller('formController', function ($scope, $http) {

 $scope.user = {};

// this is the function that accepts the user's inputs to the form on the 
// form.html page, then assigns them to the $scope.user object and then
// converts the object to JSON to be passed to the Express server & the database

 $scope.submit = function(data) {
   $scope.user.username = data.username;
   $scope.user.email = data.email;
   $scope.user.projectName = data.projectName;
   $scope.user.timeConstraint = data.timeConstraint;
   $scope.user.wanted = data.wanted;
   $scope.user.description = data.description;
   $scope.user.pledge = data.pledge;
 
   console.log('*** user info in $scope - - >', $scope.user);
 
   var stringifiedScope = JSON.stringify($scope.user);
   console.log(' -- stringifiedScope -->', stringifiedScope);

   $http({
     'method': 'POST',
     'url': 'http://localhost:8000/project',
     'Content-Type': 'application/json',
     'data': stringifiedScope
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
