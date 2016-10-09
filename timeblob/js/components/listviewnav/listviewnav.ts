import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
import CurrentEntrySensitiveComponent from '../current-sensitive';

declare var TEMPLATE:any
/**
Only used in responsive
*/
export class ListViewNav
{
  toggleListViewNav()
  {
    this.onClose();
  }

  onClose : any
  onFilterToggle : any
}


ng.module("app").component('listViewNav',
{

  controller: ListViewNav,
  templateUrl: TEMPLATE.LISTVIEWNAV,

  bindings: {
   onClose: '&',
   onFilterToggle: '&'
 }
});
