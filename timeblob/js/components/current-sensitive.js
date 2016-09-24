const EventEmitter = require("events").EventEmitter

/* A component which needs to know if the current entryhas changed. */
class CurrentEntrySensitiveComponent extends EventEmitter {

  constructor($scope, $element, $attr, CurrentEntryService) {
    super()
    Object.assign(this, {$scope, $element, $attr, CurrentEntryService})

    var ctrl = this
    var onComponentInit = []
    var onUpdateCurrent = []

    ctrl.onComponentInit = (initFunction) => {
      onComponentInit.push(initFunction)
    }

    ctrl.onUpdateCurrent = (initFunction) => {
      onUpdateCurrent.push(initFunction)
    }
    ctrl.$onInit =  () => {
      for (var i =0; i <  onComponentInit.length; i++)
      {
        onComponentInit[i]()
      }
      ctrl.CurrentEntryService.on('update-current', (entry) =>
      {

        for (var i =0; i < onUpdateCurrent.length; i++)
        {
          onUpdateCurrent[i](entry);
        }
      });



    }




  }
}

module.exports = CurrentEntrySensitiveComponent;
