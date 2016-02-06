'use strict';

describe('Controller: UniversitiesCtrl', function () {

  // load the controller's module
  beforeEach(module('appingApp'));

  var UniversitiesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UniversitiesCtrl = $controller('UniversitiesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
