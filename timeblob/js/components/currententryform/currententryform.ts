import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class CurrentEntryForm {
    currentEntryFormActive: boolean
    isFocused: boolean
    toggleCurrentEntryForm()
    {
        this.currentEntryFormActive = !this.currentEntryFormActive
    }
    currentEntryFormFocus()
    {
        this.isFocused = !this.isFocused
    }
}

ng.module("app").component('currentEntryForm',
{
    controller: CurrentEntryForm,
    templateUrl: TEMPLATE.CURRENTENTRYFORM,
});