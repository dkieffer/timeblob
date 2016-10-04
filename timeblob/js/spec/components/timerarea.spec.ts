//import 'jasmine'
import * as ng from 'angular'
import 'angular-mocks'
import * as interfaces from'../../services/interfaces'
import * as ta from '../../components/timerarea/timerarea';
describe('TimerArea', () => {

  var scope: ng.IScope
  var element : HTMLElement
  var $componentController : ng.IControllerService
  var CurrentEntryService : interfaces.ICurrentEntryService
  var interval: ng.IIntervalService;
  // Before each test load our api.users module
  beforeEach(() => {ng.mock.module('app')});

  beforeEach(inject(($injector:ng.auto.IInjectorService,
      $interval: ng.IIntervalService) => {
   $componentController = $injector.get<ng.IControllerService>('$componentController')
   interval = $interval
   CurrentEntryService =  $injector.get<interfaces.ICurrentEntryService>('CurrentEntryService')
   spyOn(CurrentEntryService, 'current').and.returnValue(null)
  }));

  it('should not have anything set before first update', () => {
      var controller:any = $componentController('timerArea')
      controller.$onInit();
      expect(controller.isRunning).toBe(false)
      expect(controller.currentEntry).toBe(null)
      expect(controller.startTime).toBe(null)
      expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')
  })

  it('should not have anything set after a null first update', () => {
    var controller = $componentController<ta.TimerArea>('timerArea')
      controller.$onInit();
      CurrentEntryService.emit('update-current', null)
      expect(controller.isRunning).toBe(false)
      expect(controller.currentEntry).toBe(null)
      expect(controller.startTime).toBe(null)
      expect(controller.clockHandStyle.transform).toBe('rotate(0 deg)')
  })

  it('should not have anything set after a get update', () => {
      var controller = $componentController<ta.TimerArea>('timerArea')
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
