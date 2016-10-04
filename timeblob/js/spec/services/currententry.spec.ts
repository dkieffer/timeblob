
import * as ng from 'angular'
import 'angular-mocks'
import * as interfaces from'../../services/interfaces'
declare var BASE_URL : string
//import 'jasmine'
describe('CurrentEntryService', function() {
  var $httpBackend: ng.IHttpBackendService;
  var timeEntry : interfaces.ITimeEntry;
  var currentEntryService : interfaces.ICurrentEntryService;
  var TimeEntryService : interfaces.ITimeEntryService;
  // Before each test load our api.users module
  beforeEach(() => {ng.mock.module('app')});

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($injector:ng.auto.IInjectorService) {
    currentEntryService = $injector.get<interfaces.ICurrentEntryService>('CurrentEntryService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', BASE_URL + '/time_entries/current').respond(404,'')

  }));

  it("current entry isn't set", function(done)
  {

    currentEntryService.on('update-current', function(entry:any) {
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
  var $httpBackend: ng.IHttpBackendService;
  var timeEntry : interfaces.ITimeEntry;
  var currentEntryService : interfaces.ICurrentEntryService;
  var TimeEntryService : interfaces.ITimeEntryService;
  // Before each test load our api.users module
  beforeEach(() => ng.mock.module('app'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function($injector: ng.auto.IInjectorService) {
    currentEntryService = $injector.get<interfaces.ICurrentEntryService>('CurrentEntryService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', BASE_URL + '/time_entries/current').respond(200, {id:1, user:1, description: "a description", start: startTime})
    $httpBackend.when('POST', BASE_URL + '/time_entries/stop').respond(200, {id:1, user:1, description: "a description", start: startTime, stop: startTime + 3000})
  }));

  it("check current", function(done)
  {

    currentEntryService.on('update-current', function(entry:any) {

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
    currentEntryService.on('update-current', function(entry:any) {

      expect(currentEntryService.cachedCurrent).toBeNull();

      [entry].forEach(function(i:any)
      {
        expect(i).toBeNull()
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
