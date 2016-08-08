//events update_current,
const EventEmitter = require("events")
class CurrentEntryService extends EventEmitter {

  constructor( $interval, TimeEntryService) {
    super()
    var self = this;
    self.TimeEntryService = TimeEntryService;
    $interval(() => self.current(), 10000)

  }
  // TODO what do I do when the device is already started and we need to stop (how do we notify of a stop)
  start(timeEntry) {
    var self = this;

    var start = self.TimeEntryService.start(timeEntry)

    start.then((i) => {self.emit('update-current', i)}, (i) => {self.emit('error', i)})

    return start;
  }

  current() {
    var self = this;
    var current = self.TimeEntryService.current()
    // TODO
    current.then((i) => {self.emit('update-current', i)}, (i) => {self.emit('error', i)})

    return current;
  }

  stop() {
    //update current
    var self = this;
    var stop = self.TimeEntryService.stop()

    stop.then((i) => {self.emit('update-current', i)}, (i) => {self.emit('error', i)})

    return stop;
  }
}

angular.module("app").factory("CurrentEntryService", ($interval, TimeEntryService) =>
{
  return new CurrentEntryService($interval, TimeEntryService);
})
