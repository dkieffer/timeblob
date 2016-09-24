

describe('TimerArea', function() {
  var scope, element, $componentController, CurrentEntryService;
  var interval;
  // Before each test load our api.users module
  beforeEach(() => {angular.mock.module('app')});

  beforeEach(inject(function($injector,  _$componentController_, $interval, _CurrentEntryService_){
   $componentController = $injector.get('$componentController')
   interval = $interval
   CurrentEntryService = _CurrentEntryService_
   spyOn(CurrentEntryService, 'current').and.returnValue(null)
  }));

  it('should not have anything set before first update', () => {
      var controller = $componentController('timerArea')
      controller.$onInit();
      expect(controller.isRunning).toBe(false)
      expect(controller.currentEntry).toBe(null)
      expect(controller.startTime).toBe(null)
      expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')
  })

  it('should not have anything set after a null first update', () => {
    var controller = $componentController('timerArea')
      controller.$onInit();
      CurrentEntryService.emit('update-current', null)
      expect(controller.isRunning).toBe(false)
      expect(controller.currentEntry).toBe(null)
      expect(controller.startTime).toBe(null)
      expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')
  })

  it('should not have anything set after a get update', () => {
    var controller = $componentController('timerArea')
    controller.$onInit();
      CurrentEntryService.emit('update-current', {'data': {'start': "2016-09-05T01:45:53+00:00", 'last_updated': "2016-09-05T01:45:53+00:00"}})
      expect(controller.isRunning).toBe(true)
      expect(controller.startTime).toBe(Date.UTC(2016,8,5,1,45,53,0))
      expect(controller.currentEntry.start).toBe("2016-09-05T01:45:53+00:00")
      //expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')

      //emitting null, meaning the current ended, gets us back to basics
      CurrentEntryService.emit('update-current', null)
      expect(controller.isRunning).toBe(false)
      expect(controller.currentEntry).toBe(null)
      expect(controller.startTime).toBe(null)
      expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')
  })





})
