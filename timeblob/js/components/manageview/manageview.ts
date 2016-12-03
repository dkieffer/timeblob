import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ManageView
{
    toggleManageView()
    {
        this.onManageViewToggle()
    }
    onManageViewToggle: any
    manageViewActive: boolean
}

ng.module("app").component('manageView',
{
    controller: ManageView,
    templateUrl: TEMPLATE.MANAGEVIEW,
    bindings: {
        onManageViewToggle: '&',
        manageViewActive: '<'
    }
});
