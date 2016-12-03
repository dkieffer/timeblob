import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class PopupMenuMain
{
    popupMenuActive: boolean
    togglePopupMenu()
    {
        this.popupMenuActive = !this.popupMenuActive;
    }
    toggleManageView()
    {
        this.onManageViewToggle();
        this.togglePopupMenu();
    }
    onManageViewToggle: any
}

ng.module("app").component('popupMenuMain',
{
    controller: PopupMenuMain,
    templateUrl: TEMPLATE.POPUPMENUMAIN,
    bindings: {
        onManageViewToggle: '&'
    }
});
