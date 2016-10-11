import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ListView extends CurrentEntrySensitiveComponent
{

  listViewActive: boolean
  filtersMenuActive: boolean
  openEntryForEdit: boolean
  constructor( CurrentEntryService:interfaces.ICurrentEntryService)
  {
    super(null,null, null, CurrentEntryService)
  }


  toggleListViewNav()
  {
    this.listViewActive = !this.listViewActive
  }

  toggleFiltersMenu()
  {
    this.filtersMenuActive = !this.filtersMenuActive
  }

  editEntry()
  {
    this.openEntryForEdit = !this.openEntryForEdit
  }

}

ng.module("app").component('listView',
{
  controller: ListView,
  templateUrl: TEMPLATE.LISTVIEW
});
