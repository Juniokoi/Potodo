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
                        total: item.total,
                        percentage: item.percentage
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

    addItem({task}: { task: string }) {
        this.items.push({
            id: this.items.length.toString(),
            content: task,
            seconds: 0,
            isActive: false,
            isFinished: false,
            percentage: 100,
            total: 0
        });

        this.updateLS();
    }

    updatePercentage(item: IItem): void {
        // Receives an item and check its percentage
        const temp = (( item.seconds - item.total) / (item.total + 1 )) * 100; // +1 to avoid 0/0
        console.log(`Temp: ${temp}, Sec: ${item.seconds}, Total:  ${item.total}, Percentage: ${item.percentage}`);

        // does nothing if item percentage === temp
        if (temp != item.percentage)
            if (Number.isFinite(temp)) {
                item.percentage = temp
                this.updateItem(item);
            } else {
                // Probably temp is infinite, so we presume its defined
                item.percentage = 100;
                this.updateItem(item);
            }

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