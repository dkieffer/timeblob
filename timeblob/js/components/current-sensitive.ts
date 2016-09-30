import events = require("events")
import * as ng from 'angular'
import * as interfaces from '../services/interfaces'

interface IUpdateCurrent {
  (entry:ng.IHttpPromiseCallbackArg<interfaces.ITimeEntry>) : void;
}

/* A component which needs to know if the current entryhas changed. */
export default class CurrentEntrySensitiveComponent extends events.EventEmitter {
  private _onComponentInit : Array<Function>
  private _onUpdateCurrent : Array<IUpdateCurrent>
  private CurrentEntryService : interfaces.ICurrentEntryService
  private $scope : ng.IScope
  private $element : HTMLElement
  private $attr :any
  constructor($scope:ng.IScope, $element: HTMLElement, $attr:any, CurrentEntryService: interfaces.ICurrentEntryService) {
    super()
    this.$scope = $scope
    this.$element = $element
    this.$attr = $attr
    this.CurrentEntryService = CurrentEntryService






  }

  $onInit() {
    var self = this
    for (var i =0; i <  self._onComponentInit.length; i++)
    {
      self._onComponentInit[i]()
    }
    this.CurrentEntryService.on('update-current', (entry) =>
    {

      for (var i =0; i < self._onUpdateCurrent.length; i++)
      {
        self._onUpdateCurrent[i](entry);
      }
    });
  }




  onComponentInit(initFunction: Function)  {
    this._onComponentInit.push(initFunction)
  }

  onUpdateCurrent(updateFunction: IUpdateCurrent) {
    this._onUpdateCurrent.push(updateFunction)
  }
}
