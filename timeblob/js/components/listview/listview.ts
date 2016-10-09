import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ListView extends CurrentEntrySensitiveComponent
{

  constructor( CurrentEntryService:interfaces.ICurrentEntryService)
  {
    super(null,null, null, CurrentEntryService)
  }

  listViewActive: boolean
  toggleListViewNav()
  {
    this.listViewActive = !this.listViewActive
  }
}

ng.module("app").component('listView',
{
  controller: ListView,
  templateUrl: TEMPLATE.LISTVIEW
});
