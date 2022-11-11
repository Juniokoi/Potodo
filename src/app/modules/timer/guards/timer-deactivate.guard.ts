import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {IDeactivate} from "../../shared/interfaces/IDeactivate";
import {TimerModule} from "../timer.module";
import {TimerRoutingModule} from "../timer-routing.module";

@Injectable({providedIn: "root"})
export class TimerDeactivateGuard implements CanDeactivate<IDeactivate> {
    canDeactivate(
        component: IDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot
    ): boolean {

        return component.canDeactivate();
    }
}