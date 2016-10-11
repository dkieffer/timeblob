import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class EditEntryForm {}

ng.module("app").component('editEntryForm',
{
  controller: EditEntryForm,
  templateUrl: TEMPLATE.EDITENTRYFORM
});