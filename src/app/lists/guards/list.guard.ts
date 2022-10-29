import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ListsService} from "../lists.service";

@Injectable({
  providedIn: 'root'
})
export class ListGuard implements CanActivate{
    constructor(private r: Router,private s: ListsService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ) :  Observable<boolean> | boolean {

            if (this.s.getItem(route.params['id']))
                return true;

            this.r.navigate(['/app']);
            return false;
            
    }
}