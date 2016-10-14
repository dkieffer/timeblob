import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class CurrentEntryForm {
}

ng.module("app").component('currentEntryForm',
{
    controller: CurrentEntryForm,
    templateUrl: TEMPLATE.CURRENTENTRYFORM,
});