describe('Users factory', function() {
  var $http;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('app'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_$http_) {
    Users = _$http_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect($http).toBeDefined();
  })
});
