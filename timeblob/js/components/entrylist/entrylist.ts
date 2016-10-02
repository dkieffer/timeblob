import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE : any

class EntryList extends CurrentEntrySensitiveComponent {

  waitingForResponse : boolean
  entries : Array<interfaces.ITimeEntry>
  TimeEntryService: interfaces.ITimeEntryService

  constructor($scope:any, $element:any, $attr:any, TimeEntryService:any)
  {
    super($scope, $element, $attr, TimeEntryService)
    var self = this;
    self.waitingForResponse = false;
    self.entries = [];
    self.TimeEntryService
    TimeEntryService.on('update-current', function(entry:any) {
    //  var beforeDate = self.entries.first()
      //
    })
  }

  get(beforeDate:any= null, afterDate:any=null, max:any=20)
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
