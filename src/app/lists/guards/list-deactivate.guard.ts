import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {ListPomoComponent} from "../list-pomo/list-pomo.component";
import {ICanDeactivate} from "./ICanDeactivate";

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class ListDeactivateGuard implements CanDeactivate<ICanDeactivate> {
    canDeactivate(
        component: ICanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot
    ): boolean {

        return component.canDeactivate();
    }
}