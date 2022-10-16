import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class ListService {
    private items: string[] = [];

    constructor() { }

    getItems() {
        return this.items;
    }
    addItem(item: string) {
        this.items.push(item);
    }

}
