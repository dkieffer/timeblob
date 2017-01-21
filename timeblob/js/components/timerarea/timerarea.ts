import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE : any

export class TimerArea extends CurrentEntrySensitiveComponent
{
  private $interval : ng.IIntervalService
  isRunning : boolean
  isStarting : boolean
  currentEntry: interfaces.ITimeEntry
  startTime: number
  lastUpdated: Date
  clockHandStyle: any
  constructor(CurrentEntryService : interfaces.ICurrentEntryService, $interval: ng.IIntervalService) {
    super(null, null, null, CurrentEntryService)
    this.$interval =  $interval

    var ctrl = this
    ctrl.onComponentInit(() => {
      ctrl.isRunning = false
      ctrl.currentEntry = null
      ctrl.startTime = null
      ctrl.lastUpdated = null
      ctrl.clockHandStyle = { 'transform': 'rotate(0 deg)'};
      ctrl.onUpdateCurrent((entry) =>{
        if (entry == null)
        {
          ctrl.isRunning = false;
          ctrl.currentEntry = null;
          ctrl.startTime = null;
          ctrl.lastUpdated
        }
        else {
          ctrl.startTime = Date.parse(entry.data.start);
          ctrl.isRunning = true;
          ctrl.currentEntry = entry.data;
        }
        ctrl.updateClockHandle();
      }
      )
    })

  }

// Scope is undefined here so the watch function does not work
  toggleClock($scope) {
      var rotateClock;
      var ctrl = this;
      var degree = 0;
      var transRotation;
      //isStarting is for the period when the client starts the timer, but the server has not yet confirmed that the timer has been started. Below it toggles just for testing.
      ctrl.isStarting = !ctrl.isStarting;
      ctrl.isRunning = !ctrl.isRunning;
      console.log('toggling clock');
      rotateClock = setInterval(function(){
          if(!ctrl.isRunning) {
            console.log('Clock stopped');
            clearInterval(rotateClock);
            return;
          } else {
            degree = degree + 0.24;
            console.log(degree);
            ctrl.clockHandStyle = { 'transform': 'rotate(' + degree + 'deg)'};
            $scope.$watch('number', function(degree){
                transRotation = 'rotate('+ degree +'deg)';
            });  
          }
      }, 40);
  }

  updateClockHandle()
  {
    var ctrl = this;


    if (!ctrl.isRunning) {
        ctrl.clockHandStyle = { 'transform': 'rotate(0 deg)'};
        return;
    } else {
        var currentTime = Date.now() - ctrl.startTime;
        var degree = 0.006 * currentTime;
        ctrl.clockHandStyle = { 'transform': 'rotate(' + degree + 'deg)'};
    }
  }
}

ng.module("app").component('timerArea',
{
  controller: TimerArea,
  templateUrl: TEMPLATE.TIMERAREA
});
