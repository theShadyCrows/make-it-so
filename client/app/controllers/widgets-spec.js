'use strict';

describe('widgetsController factory', function() {
  var widgetsController;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('makeitso.widgets'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_widgetsController_) {
    widgetsController = _widgetsController_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(widgetsController).toBeDefined();
  });
});