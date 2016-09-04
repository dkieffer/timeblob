/*function TimerArea($scope, $element, $attrs, $interval, CurrentEntryService)
{
  var ctrl = this

  ctrl.isRunning = false;
  ctrl.$onInit = () => {
    CurrentEntryService.on('update-current', (entry) =>
    {
      //compare if anything has changed from current entry.
      ctrl.currentEntry = entry;
      if (entry == null)
      {
        ctrl.isRunning = false;

      }
      else {
        startTime = entry.start;
        ctrl.isRunning = true;
      }
      updateClockHandle();
    });

    CurrentEntryService.current();
  }


}*/
