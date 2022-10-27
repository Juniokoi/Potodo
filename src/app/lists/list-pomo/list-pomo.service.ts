import {Injectable} from '@angular/core';
import {IItem} from "../IItem";
import {ListsService} from "../lists.service";

@Injectable({
    providedIn: 'root'
})
export class ListPomoService {

    constructor(private listService: ListsService) {
    }

    getItem(id: string) {
        return this.listService.getItem(id);
    }

    updateItem(item: IItem) {
        this.listService.updateItem(item);
    }

}