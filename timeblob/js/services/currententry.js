//events update_current,
const EventEmitter = require("events").EventEmitter
class CurrentEntryService extends EventEmitter {

  constructor( $interval, TimeEntryService) {
    super()
    var self = this;
    self.TimeEntryService = TimeEntryService;
    $interval(() => self.current(), 10000)

    self.cachedCurrent = null;

  }

  setCurrent(response) {
    var self = this;
    self.cachedCurrent = response;
    self.emit('update-current', response)
  }
  // TODO what do I do when the device is already started and we need to stop (how do we notify of a stop)
  start(timeEntry) {
    var self = this;

    var start = self.TimeEntryService.start(timeEntry)

    start.then((i) => {
        if (i.data.id == undefined) {
          self.emit('validation-error', i);
        }
        else {
          self.emit('update-current', i)
        }
      },
      (i) => { self.emit('error', i);

    })

    return start;
  }

  current() {
    var self = this;
    var current = self.TimeEntryService.current()
    // TODO
    current.then(
      (response) => self.setCurrent(response),
      (response) => {
        //if the response status is 404, we're fine, there is no current
        if (response.status == 404)
        {
          self.setCurrent(null)
        }
        else {
            self.emit('error', response)
        }
        })

    return current;
  }

  stop() {
    //update current
    var self = this;
    var stop = self.TimeEntryService.stop()

    stop.then((i) => {
      if (i.status == 200)
      {
        self.setCurrent(null)
      }
      else {
        self.setCurrent(i)

      }

    }, (i) => {self.emit('error', i)})

    return stop;
  }
}

angular.module("app").factory("CurrentEntryService", ($interval, TimeEntryService) =>
{
  return new CurrentEntryService($interval, TimeEntryService);
})
