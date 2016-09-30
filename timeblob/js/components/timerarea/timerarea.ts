import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE : any

export class TimerArea extends CurrentEntrySensitiveComponent
{
  private $interval : ng.IIntervalService
  isRunning : boolean
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
