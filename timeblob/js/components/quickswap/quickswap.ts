import * as interfaces from '../../services/interfaces'
import * as ng from 'angular'
declare var TEMPLATE:any

export class QuickSwap
{
    quickSwapMenuActive: boolean
    toggleQuickSwapMenu()
    {
        this.quickSwapMenuActive = !this.quickSwapMenuActive
    }
}

ng.module("app").component('quickSwap',
{
  controller: QuickSwap,
  templateUrl: TEMPLATE.QUICKSWAP,
});
