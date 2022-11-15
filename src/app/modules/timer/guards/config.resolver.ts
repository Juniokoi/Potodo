import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IItem} from "../../shared/interfaces/IItem";
import {TimerService} from "../timer.service";
import {IUser} from "../../shared/interfaces/IUser";

@Injectable()
export class ConfigResolver implements Resolve<IUser>{
    constructor(private service:TimerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUser {

        return this.service.getUserSettings();
    }
}