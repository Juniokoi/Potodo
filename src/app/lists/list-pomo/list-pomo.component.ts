import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {IItem} from "../IItem";
import {ICanDeactivate} from "../guards/ICanDeactivate";
import {ListsService} from "../lists.service";

@Component({
    selector: 'list-pomo',
    templateUrl: './list-pomo.component.html',
    styleUrls: ['./list-pomo.component.scss']

})

export class ListPomoComponent implements OnInit, ICanDeactivate {
    /*  Note:
    *   The ListPomoService item is reduced to variable s
    *   this choice were made to make the code easier to read
    *   and also to maintain
    *  */


    sub: Subscription;
    interval: any;
    item!: IItem;

    constructor(
        private route: ActivatedRoute,
        private service: ListsService
    ) {
        this.sub = this.route.data.subscribe(
            ({tasks}) => {
                this.item = tasks
            }
        );
    }

    canDeactivate(): boolean {
        if (this.item.isActive) {
            if (confirm("O seu pomodoro esta rolando, sair da página irá pausa-loTem certeza que deseja sair?")) {
                this.item.isActive = false;
                return false;
            }
        }
        return true;
    }

    ngOnInit(): void {
    }

    updateItem(){
        this.service.updateItem(this.item)
    }
    timerPause() {
        this.item.isActive = false
        this.updateItem()
        clearInterval(this.interval)
    }
    timerStart(mins: number) {
        if (this.item.seconds<= 0)
            this.item.seconds = mins * 60;

        this.item.isActive = true;

        this.interval = setInterval(() => {

            this.item.seconds--;

            // each 5 sec the item get updated in LS
            if ( this.item.seconds % 5 === 0) this.updateItem();

            // When times ends, shouts an alert
            if ( this.item.seconds <= 0) {
                this.item.isActive = false;
                this.item.isFinished = true;
                clearInterval(this.interval);
                alert("🚨 It is Cool 😎. I wish you could share ");
                this.updateItem();
            }
        }, 1000);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}