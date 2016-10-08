import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

ng.module("app").component('listViewNav',
{
  controller: ListViewNav,
  templateUrl: TEMPLATE.LISTVIEWNAV

  
});