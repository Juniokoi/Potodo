import {Injectable} from '@angular/core';
import {IItem} from "./IItem";

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class ListsService {

    items: IItem[] = [];

    constructor() {
        if (this.getLS()) {
            let tempItems = this.getLS();
            for (let item of tempItems) {
                this.items = [...this.items,
                    {
                        id: item.id,
                        content: item.content,
                        seconds: item.seconds,
                        isActive: item.isActive,
                        isFinished: item.isFinished,
                    }
                ];
            }
        }
    }
    getListItems() {
        return this.items;
    }

    // LS = LocalStorage
    getLS() {
        try {
            return JSON.parse(localStorage.getItem("items")!);
        } catch (e) {
            console.error(e);
        }
    }

    updateLS() {
        localStorage.setItem("items", JSON.stringify(this.items));
    }

    addItem(item: string) {
        this.items.push({
            id: this.items.length.toString(),
            content: item,
            seconds:0,
            isActive: false,
            isFinished:false
        });

        this.updateLS();
    }

    getItem(id: string): IItem {
        let tempItem: IItem;
        this.items.forEach((el, index) => {
            if (id == el.id)
                tempItem = el;

            return -1;
        });
        return tempItem!;
    }

    updateItem(item: IItem) {
        this.items.forEach((el, index) => {
            if (item == el) this.items[index] = el;

            return -1;
        });
        this.updateLS();
    }

    removeItem(item: string) {
        this.items.forEach((el, index) => {
            if (item == el.content) this.items.splice(index, 1);
            this.updateLS();
        });
    }
}