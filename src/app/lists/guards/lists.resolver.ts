import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IItem} from "../IItem";
import {ListsService} from "../lists.service";

@Injectable()
export class ListsResolver implements Resolve<IItem>{
    constructor(private service:ListsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IItem {

        return this.service.getItem(route.paramMap.get('id')!);
    }
}