const EventEmitter = require("events")

/* A component which needs to know if the current entryhas changed. */
class CurrentEntrySensitiveComponent extends EventEmitter {
  /* @ngInject */
  constructor($scope, $element, $attr, CurrentEntryService) {
    super()
    Object.assign(this, {$scope, $element, $attr, CurrentEntryService})

    var ctrl = this
    ctrl.onComponentInit = []
    ctrl.onUpdateCurrent = []

    ctrl.$onInit =  () => {
      ctrl.CurrentEntryService.on('update-current', (entry) =>
      {

        for (var i =0; i < ctrl.onUpdateCurrent.length; i++)
        {
          ctrl.onUpdateCurrent[i](entry);
        }
      });


      for (var i =0; i <  ctrl.onComponentInit.length; i++)
      {
        ctrl.onComponentInit[i]()
      }
    }

  }
}

module.exports = CurrentEntrySensitiveComponent;
