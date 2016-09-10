'use strict';

// WIDGETS TESTING
describe('Widgets Controller', function() {
  var $controller
  var widgetsController;
  var $scope;
  var $location;
  var $anchorScroll;
  var topBountiesFactory;

  // LOAD AND ADD MODULES
  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('makeitso.widgets'));
  beforeEach(angular.mock.module('makeitso.services'));

  // INJECT CONTROLLER
  beforeEach(inject(function(_$controller_, $rootScope, _$location_, _$anchorScroll_, _topBountiesFactory_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    $location = _$location_;
    $anchorScroll = _$anchorScroll_;
    topBountiesFactory = _topBountiesFactory_;

    widgetsController = $controller('widgetsController', {
      $scope: $scope,
      $location: $location,
      $anchorScroll: $anchorScroll,
      topBountiesFactory: topBountiesFactory
    });
  }));

  // VERIFY THE CONTROLLER EXISTS
  it('should be defined', function() {
    expect(widgetsController).toBeDefined();
  });

  describe('Widgets Factory', function() {

    // INJECT FACTORY
    beforeEach(inject(function(_topBountiesFactory_) {
      topBountiesFactory = _topBountiesFactory_;
    }));

    // VERIFY THE FACTORY EXISTS
    it('should be defined', function() {
      expect(topBountiesFactory).toBeDefined();
    });
  });
});

// // WIDGETS FACTORY TESTING
// describe('Widgets Factory', function() {
//   var topBountiesFactory;

//   // LOAD MODULES
//   beforeEach(angular.mock.module('makeitso.services'));

//   // INJECT FACTORY
//   beforeEach(inject(function(_topBountiesFactory_) {
//     topBountiesFactory = _topBountiesFactory_;
//   }));

//   // VERIFY THE FACTORY EXISTS
//   it('should be defined', function() {
//     expect(topBountiesFactory).toBeDefined();
//   });
// });