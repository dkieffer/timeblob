import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ListFilters
{

  toggleFiltersMenu()
  {
    this.onFilterToggle();
  }

  onFilterToggle : any
  filtersMenuActive: boolean
}

ng.module("app").component('listFilters',
{
  controller: ListFilters,
  templateUrl: TEMPLATE.LISTFILTERS,
  bindings: {
    filtersMenuActive: '<',
    onFilterToggle : '&'
  }
});
