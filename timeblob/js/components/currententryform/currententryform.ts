import CurrentEntrySensitiveComponent from '../current-sensitive';
import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class CurrentEntryForm {
    currentEntryFormActive: boolean
    isFocused: boolean
    notificationOn: boolean
    toggleCurrentEntryForm()
    {
        this.currentEntryFormActive = !this.currentEntryFormActive
    }
    // Call this function to display a notification
    notifyPerson()
    {
        this.notificationOn = !this.notificationOn
    }
}

ng.module("app").component('currentEntryForm',
{
    controller: CurrentEntryForm,
    templateUrl: TEMPLATE.CURRENTENTRYFORM,
});