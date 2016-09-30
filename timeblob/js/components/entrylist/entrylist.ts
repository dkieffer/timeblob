import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE : any

class EntryList extends CurrentEntrySensitiveComponent {

  waitingForResponse : boolean
  entries : Array<interfaces.ITimeEntry>
  TimeEntryService: interfaces.ITimeEntryService

  constructor($scope, $element, $attr, TimeEntryService)
  {
    super($scope, $element, $attr, TimeEntryService)
    var self = this;
    self.waitingForResponse = false;
    self.entries = [];
    self.TimeEntryService
    TimeEntryService.on('update-current', function(entry) {
    //  var beforeDate = self.entries.first()
      //
    })
  }

  get(beforeDate= null, afterDate=null, max=20)
  {
    var self = this;
    //get more
    self.waitingForResponse = true;
    self.TimeEntryService.list(null).then(
      (entries) => ng.merge(self.entries, entries),
      //report error
      (error) => self.waitingForResponse = false
    ).then(() => self.waitingForResponse = false)
  }


}
