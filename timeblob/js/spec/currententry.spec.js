describe('CurrentEntryService', function() {
  var $httpBackend;
  var timeEntry;
  var currentEntryService;
  var TimeEntryService;
  // Before each test load our api.users module
  beforeEach(module('app'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($injector, CurrentEntryService) {
    currentEntryService = CurrentEntryService;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', BASE_URL + '/time_entries/current').respond(404,'')

  }));

  it("current entry isn't set", function(done)
  {

    currentEntryService.on('update-current', function(entry) {
      expect(entry).toBe(null)
      done()
    })
    $httpBackend.expectGET(BASE_URL + '/time_entries/current')
    currentEntryService.current()
    expect(currentEntryService.cachedCurrent).toBe(null)
    $httpBackend.flush();
  })

});
