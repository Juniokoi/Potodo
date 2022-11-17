import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TimerService} from "../timer.service";
import {TimerRoutingModule} from "../timer-routing.module";

@Injectable({providedIn: "root"})
export class ListGuard implements CanActivate{
    constructor(private r: Router,private s: TimerService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ) :  Observable<boolean> | boolean {

            if (this.s.getItem(route.params['id']) && route.params['id'] === this.s.getRoute())
                return true;

            this.r.navigate(['/timer']);
            return false;
            
    }
}