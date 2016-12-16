import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class ManageView
{
    subListActive: boolean
    projectListActive: boolean
    clientListActive: boolean
    orgListActive: boolean
    x: number
    toggleManageView(x)
    {
        if (this.subListActive) {
            this.toggleSubLists(x);
            this.onManageViewToggle();
        } else {
            this.onManageViewToggle();
        }
    }

    toggleSubLists(x)
    {
        if (x == 0) {
            this.projectListActive = !this.projectListActive;
            this.clientListActive = false;
            this.orgListActive = false;
        } else if (x == 1) {
            this.clientListActive = !this.clientListActive;
            this.projectListActive = false;
            this.orgListActive = false;
        } else if (x == 2) {
            this.orgListActive = !this.orgListActive;
            this.clientListActive = false;
            this.projectListActive = false;
        } else {
            this.subListActive = !this.subListActive;
            this.projectListActive = false;
            this.clientListActive = false;
            this.orgListActive = false;
        }
        if (this.orgListActive || this.clientListActive || this.projectListActive) {
            this.subListActive = true;
        }

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
