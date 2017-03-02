import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
import CurrentEntrySensitiveComponent from '../current-sensitive';

declare var TEMPLATE:any
/**
Only used in responsive
*/
export class ListViewNav
{
  popupMenuActive: boolean
  toggleListViewNav()
  {
    this.onClose();
  }

  toggleFiltersMenu()
  {
    this.onFiltersToggle()
    if (this.popupMenuActive) {
      this.togglePopupMenu()
    }
  }
  togglePopupMenu()
  {
    this.popupMenuActive = !this.popupMenuActive
  }

  onClose : any
  onFiltersToggle : any
}


ng.module("app").component('listViewNav',
{

  controller: ListViewNav,
  templateUrl: TEMPLATE.LISTVIEWNAV,

  bindings: {
   onClose: '&',
   onFiltersToggle: '&'
 }
});
