import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

ng.module("app").component('listFilters',
{
  //controller: ListFilters,
  templateUrl: TEMPLATE.LISTFILTERS
});