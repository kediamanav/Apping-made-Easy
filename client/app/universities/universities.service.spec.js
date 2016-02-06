'use strict';

describe('Service: Universities', function () {

  // load the service's module
  beforeEach(module('appingApp'));

  // instantiate service
  var universities;
  beforeEach(inject(function (_Universities_) {
    universities = _Universities_;
  }));

  it('should do something', function () {
    expect(!!universities).toBe(true);
  });

});
