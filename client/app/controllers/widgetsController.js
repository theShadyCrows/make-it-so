angular.module('makeitso.widgets', [])

.controller('widgetsController', function($scope, topBountiesFactory) {
  $scope.data = {};

  // TOP BOUNTIES: REQUEST DATA AND APPEND TOP PAGE ===================================
  topBountiesFactory.topBounties()
  .success(function (topBountiesObject) {
    $scope.data.topBounties = topBountiesObject[0];
  })
  .catch(function (error) {
    console.error(error);
  });
});