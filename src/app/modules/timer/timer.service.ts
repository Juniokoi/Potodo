import {Injectable} from '@angular/core';
import {IItem} from "../shared/interfaces/IItem";
import {IUser} from "../shared/interfaces/IUser";

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class TimerService {
    newUser: boolean;
    user: IUser = {
        name: "Usuário",
        items: [],
        timerSetting: {
            focusTimer: 25,
            shortPause: 30,
            longPause: 5
        },
        autoPlay: false,
        autoPause: false
    };

    constructor() {
        this.newUser = (localStorage.getItem('userSettings') === null);

        if (this.getLocalStorage()) {
            const tempUser: IUser = this.getLocalStorage();
            let tempItems: IItem[] = [];

            for (let _item of tempUser.items) {
                tempItems = [...tempItems,
                    {
                        id: _item.id,
                        content: _item.content,
                        complete: _item.complete
                    }
                ];
            }

            if (this.newUser) {
                this.createNewUser();
            } else {
                this.user = {
                    name: tempUser.name,
                    items: tempItems,
                    timerSetting: {
                        focusTimer: tempUser.timerSetting.focusTimer,
                        shortPause: tempUser.timerSetting.shortPause,
                        longPause: tempUser.timerSetting.longPause
                    },
                    autoPlay: tempUser.autoPlay,
                    autoPause: tempUser.autoPause
                }
            }
            this.updateLocalStorage();
        }
    }

    getListItems() {
        return this.user.items;
    }

    // LS = LocalStorage
    getLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem("userSettings")!);
        } catch (e) {
            console.error(e);
        }
    }

    updateLocalStorage() {
        localStorage.setItem("userSettings", JSON.stringify(this.user));
    }

    getUserSettings() {
        return this.user;
    }

    updateUser(_user: IUser) {
        this.user.items = this.getListItems();
        this.user.timerSetting = _user.timerSetting;
        this.user.autoPlay = _user.autoPlay;
        this.user.autoPause = _user.autoPause;

        this.updateLocalStorage();
    }

    createNewUser() {
        this.user  =  {
            name: "Novo Usuário",
            items: [
                {id: "0", content: "Revisar as anotações da aula", complete: false},
                {id: "1", content: "Terminar o trabalho", complete: false},
                {id: "2", content: "Arrumar o quarto", complete: true}
            ],
            timerSetting: {
                focusTimer: 25,
                shortPause: 30,
                longPause: 5
            },
            autoPlay: false,
            autoPause: false
        };
    }

    addItem({task}: { task: string }) {
        this.user.items.push({
            id: this.user.items.length.toString(),
            content: task,
            complete: false
        });

        this.updateLocalStorage();
    }

    getItem(id: string): IItem {
        let tempItem: IItem;
        this.user.items.forEach((el, index) => {
            if (id == el.id)
                tempItem = el;

            return -1;
        });
        return tempItem!;
    }

    updateItem(item: IItem) {
        this.user.items.forEach((el, index) => {
            if (item == el) this.user.items[index] = el;
            return -1;
        });
        this.updateLocalStorage();
    }

    checkItem(id: string, value: boolean) {
        this.user.items.forEach((el, index) => {
            if (id == el.id) this.user.items[index].complete = value
            this.updateLocalStorage();
        });

    }

    removeItem(item: string) {
        this.user.items.forEach((el, index) => {
            if (item == el.content) this.user.items.splice(index, 1);
            this.updateLocalStorage();
        });
    }
}