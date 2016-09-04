

describe('CurrentEntryService', function() {
  var $httpBackend;
  var timeEntry;
  var currentEntryService;
  var TimeEntryService;
  // Before each test load our api.users module
  beforeEach(() => {angular.mock.module('app')});

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($injector, _CurrentEntryService_) {
    currentEntryService = _CurrentEntryService_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', BASE_URL + '/time_entries/current').respond(404,'')

  }));

  it("current entry isn't set", function(done)
  {

    currentEntryService.on('update-current', function(entry) {
      expect(entry).toBe(null)
      expect(currentEntryService.cachedCurrent).toBe(null)
      done()
    })
    $httpBackend.expectGET(BASE_URL + '/time_entries/current')
    currentEntryService.current()

    $httpBackend.flush();
  })


});


describe('CurrentEntryServiceWithCurrent', function() {
  var startTime = Date.now();
  var stopTime = startTime + 3000;
  var $httpBackend;
  var timeEntry;
  var currentEntryService;
  var TimeEntryService;
  // Before each test load our api.users module
  beforeEach(angular.mock.module('app'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($injector, CurrentEntryService) {
    currentEntryService = CurrentEntryService;
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', BASE_URL + '/time_entries/current').respond(200, {id:1, user:1, description: "a description", start: startTime})
    $httpBackend.when('POST', BASE_URL + '/time_entries/stop').respond(200, {id:1, user:1, description: "a description", start: startTime, stop: startTime + 3000})
  }));

  it("check current", function(done)
  {

    currentEntryService.on('update-current', function(entry) {

      [entry, currentEntryService.cachedCurrent].forEach(function(i)
        {
          expect(i.status).toBe(200)
          expect(i.data['id']).toBe(1)
          expect(i.data['user']).toBe(1)
          expect(i.data['description']).toBe("a description")
          expect(i.data['start']).toBe(startTime)
        })

      done()
    })
    $httpBackend.expectGET(BASE_URL + '/time_entries/current')
    currentEntryService.current()
    $httpBackend.flush();
  })

  it("stop current", function(done)
  {
    var totalDone = 0
    currentEntryService.on('update-current', function(entry) {

      [entry, currentEntryService.currentCached].forEach(function(i)
      {
        expect(i, null)
      })

      totalDone++
      if (totalDone >=2)
        done()
    })
    $httpBackend.expectPOST(BASE_URL + '/time_entries/stop')
    currentEntryService.stop().then((i) =>
    {
      expect(i.status).toBe(200)
      expect(i.data['id']).toBe(1)
      expect(i.data['user']).toBe(1)
      expect(i.data['description']).toBe("a description")
      expect(i.data['start']).toBe(startTime)
      expect(i.data['stop']).toBe(stopTime)
      totalDone++
      if (totalDone >=2)
        done()
    })
    $httpBackend.flush();
  })



});
