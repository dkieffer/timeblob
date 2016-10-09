import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
import Map from 'es6-map'


declare var TEMPLATE : any

class EntryList extends CurrentEntrySensitiveComponent {

  waitingForResponse : boolean

  entries: Map<number, interfaces.ITimeEntry>
  TimeEntryService: interfaces.ITimeEntryService

  constructor($scope:any, $element:any, $attr:any, TimeEntryService:any)
  {
    super($scope, $element, $attr, TimeEntryService)
    var self = this;
    self.waitingForResponse = false;

    self.TimeEntryService
    self.entries = new Map<number, interfaces.ITimeEntry>();
    TimeEntryService.on('update-current', function(entry: interfaces.ITimeEntry) {
    //  var beforeDate = self.entries.first()
      self.addOrMergeToEntries(entry)
    })

  }

  get(filters:interfaces.IListFilters)
  {
    var self = this;
    //get more
    self.waitingForResponse = true;
    self.TimeEntryService.list(filters).then(
      (entries: Array<interfaces.ITimeEntry>) => entries.forEach((entry) =>  self.addOrMergeToEntries(entry)),
      //report error
      (error) => self.waitingForResponse = false
    ).then(() => self.waitingForResponse = false)
  }

  private addOrMergeToEntries(entry:interfaces.ITimeEntry)
  {
    var self = this;
    self.entries.set(entry.id, entry);


  }




}
