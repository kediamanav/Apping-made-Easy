'use strict';

describe('Service: Scores', function () {

  // load the service's module
  beforeEach(module('appingApp'));

  // instantiate service
  var scores;
  beforeEach(inject(function (_Scores_) {
    scores = _Scores_;
  }));

  it('should do something', function () {
    expect(!!scores).toBe(true);
  });

});
