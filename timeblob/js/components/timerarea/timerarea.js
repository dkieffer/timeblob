
const CurrentEntrySensitiveComponent = require ('../current-sensitive')

class TimerArea extends CurrentEntrySensitiveComponent {



  constructor(CurrentEntryService, $interval){
    super(null, null, null, CurrentEntryService)
    Object.assign(this, {$interval})

    var ctrl = this;
    ctrl.onComponentInit(() => {
      ctrl.isRunning = false;
      ctrl.currentEntry = null;
      ctrl.startTime = null;
      ctrl.lastUpdated = null
      ctrl.clockHandStyle = { 'transform': 'rotate(0 deg)'};
      ctrl.onUpdateCurrent((entry) =>
      {
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
      })


      $interval(() => ctrl.updateClockHandle(), 40);
    });

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

  start() {
    var ctrl = this;
    // begin rotating
    ctrl.CurrentEntryService.start(ctrl.currentEntry);
    //update timeblob
    //
  };
  stop() {var ctrl = this; ctrl.CurrentEntryService.stop()}

  static get $inject() {
	      return [
          'CurrentEntryService',
          '$interval'
	      ];
	    }
}


angular.module("app").component('timerArea',
{
  controller: TimerArea,
  templateUrl: TEMPLATE.TIMERAREA
});
/*
// Click to start and stop the clock
var degree = 0, timer, isRunning = false, nowTime;
$('.stopwatch-component:first').on('click', function() {
    console.log('click registered');

    if (!isRunning) {
        rotate();
        stopwatchRun();
        isRunning = true;
        $('#stopwatch-message').text('tap to finish');
        $('#stopwatch-time').css('color', 'rgba(255,255,255,1)');
        $('#clock-hand-inner-glow').css('opacity', '1');
        $('#clock-hand-big-back-glow').css('opacity', '0.7');

        // Input Time & Date of Stopwatch Start
        if (!$('#input-start-time').val()) {
            nowTime = dt.getHours() + ":" + dt.getMinutes();
            nowDate = dt.getDay() + "/" + dt.getMonth() + "/" + dt.getFullYear();
            $('#input-start-time').css('color', 'rgba(255,255,255,1)');
            $('#input-start-date').css('color', 'rgba(255,255,255,1)');
            $('#input-start-time').val(nowTime);
            $('#input-start-date').val(nowDate);
            $('#input-start-time').css('color', 'rgba(255,149,77,1)');
            $('#input-start-date').css('color', 'rgba(255,149,77,1)');
        }
        if (!$('#input-end-date').val('')) {
            $('#input-end-date').val('');
        }

        $('#input-end-time').val('...');
        $('#input-end-time').css('opacity', '0.5');
    } /*else if (isRunning && totalSessionTime != 0) {
        isRunning = false;
        $('#stopwatch-message').text('tap to resume');
        $('#clock-hand-inner-glow').css('opacity', '0');
        $('#clock-hand-big-back-glow').css('opacity', '0');

        // Input Time & Date of Stopwatch End
        if ($('#input-end-time').val('...')) {
            nowTime = dt.getHours() + ":" + dt.getMinutes();
            nowDate = dt.getDay() + "/" + dt.getMonth() + "/" + dt.getFullYear();
            $('#input-end-time').css('color', 'rgba(255,255,255,1)');
            $('#input-end-date').css('color', 'rgba(255,255,255,1)');
            $('#input-end-time').val(nowTime);
            $('#input-end-date').val(nowDate);
            $('#input-end-time').css('color', 'rgba(255,149,77,1)');
            $('#input-end-date').css('color', 'rgba(255,149,77,1)');
            $('#input-end-time').css('opacity', '1');
        }

    }*//* else {
        isRunning = false;
        $('#stopwatch-message').text('tap to start');
        $('#clock-hand-inner-glow').css('opacity', '0');
        $('#clock-hand-big-back-glow').css('opacity', '0');
        $('#stopwatch-time').css('color', 'rgba(160,60,139,0)');
        resetClockHand();
        totalSessionTime = 0;
    }
});
/*
// Reset clock hand position to beginning
function resetClockHand () {
    $('#clock-hand').css({ 'transform': 'rotate(' + degree + 'deg)'});
    timer = setTimeout(function() {
        degree = degree - 1;
        if (!isRunning && degree >= 0) {
            resetClockHand();
        } else {
            return;
        }
    },10);
}

//the stopwatch time tracker starts at zero and adds a seconds every 1000 milliseconds
var totalSessionTime = 0, stopwatch, totalSessionTimeFormated;
function stopwatchRun () {
    stopwatch = setTimeout(function() {
        if (!isRunning) {
            return;
        } else {
            totalSessionTime = ++totalSessionTime;
            stopwatchRun();
        }
    },1000);
    //format total session time for stopwatch face
    if (totalSessionTime < 60) {
        totalSessionTimeFormatted =  totalSessionTime +'s';
    } else if (totalSessionTime < 3600) {
        totalSessionTimeFormatted = Math.floor(totalSessionTime / 60) + 'm ' + totalSessionTime % 60 + 's';
    } else if (totalSessionTime < 3660) {
        totalSessionTimeFormatted = Math.floor(totalSessionTime / 3600) + 'h ' + Math.floor(totalSessionTime % 3600) + 's';
    } else if (totalSessionTime >=3660) {
        totalSessionTimeFormatted = Math.floor(totalSessionTime / 3600) + 'h ' + Math.floor((totalSessionTime % 3600) / 60) + 'm';
    }
    //output total time on stopwatch face, and form field
    $('#stopwatch-time').text(totalSessionTimeFormatted);
    $('input#input-total-time').val(totalSessionTimeFormatted);
}*/
