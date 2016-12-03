import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class SubMenus
{
    popupMenuActive: boolean
    manageViewActive: boolean
    togglePopupMenu()
    {
        this.popupMenuActive = !this.popupMenuActive;
    }
    toggleManageView()
    {
        this.manageViewActive = !this.manageViewActive;
    }
}

ng.module("app").component('subMenus',
{
    controller: SubMenus,
    templateUrl: TEMPLATE.SUBMENUS,
});
