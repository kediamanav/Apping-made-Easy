'use strict';

describe('Controller: ScoresCtrl', function () {

  // load the controller's module
  beforeEach(module('appingApp'));

  var ScoresCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoresCtrl = $controller('ScoresCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
