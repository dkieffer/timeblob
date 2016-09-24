const CurrentEntrySensitiveComponent = require ('../current-sensitive')

class EntryList extends CurrentEntrySensitiveComponent {



  constructor($scope, $element, $attr, TimeEntryService)
  {
    super($scope, $element, $attr, TimeEntryService)
    var self = this;
    self.waitingForResponse = false;
    self.entries = [];
    self.TimeEntryService
    TimeEntryService.on('update-current', function(entry) {
      var beforeDate = entries.first
      //
    })
  }

  get(beforeDate= null, afterDate=null, max=20)
  {
    var self = this;
    //get more
    self.waitingForResponse = true;
    self.TimeEntryService.list(null,null).then(
      (entries) => angular.merge(self.entries, entries),
      //report error
      (error) => self.waitingForResponse = false
    ).then(() => self.waitingForResponse = false)
  }


}
