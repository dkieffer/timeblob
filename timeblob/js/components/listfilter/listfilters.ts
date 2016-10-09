import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ListFilters
{
  filtersMenuActive: boolean
  toggleFiltersMenu()
  {
    this.filtersMenuActive = !this.filtersMenuActive
  }
}

ng.module("app").component('listFilters',
{
  controller: ListFilters,
  templateUrl: TEMPLATE.LISTFILTERS
});