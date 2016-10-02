
import * as ng from 'angular'
import 'angular-mocks'
import * as interfaces from'../../services/interfaces'
declare var BASE_URL : string
//import 'jasmine'
describe('TimeEntryService', function() {
  var $http : ng.IHttpService;

  // Before each test load our api.users module
  beforeEach(() => ng.mock.module('app'));

  beforeEach(inject(function(_$http_:ng.IHttpService) {
    $http = _$http_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect($http).toBeDefined();
  })
});
