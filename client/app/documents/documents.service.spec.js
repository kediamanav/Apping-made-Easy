'use strict';

describe('Service: UserDocs', function () {

  // load the service's module
  beforeEach(module('appingApp'));

  // instantiate service
  var documents;
  beforeEach(inject(function (_UserDocs_) {
    documents = _UserDocs_;
  }));

  it('should do something', function () {
    expect(!!documents).toBe(true);
  });

});
