import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IItem} from "../../shared/interfaces/IItem";
import {TimerService} from "../timer.service";

@Injectable()
export class ListsResolver implements Resolve<IItem>{
    constructor(private service:TimerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IItem {

        return this.service.getItem(route.paramMap.get('id')!);
    }
}