import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ListsService} from "../lists.service";
import {IItem} from "../IItem";
import {ListPomoService} from "./list-pomo.service";

@Component({
    selector: 'list-pomo',
    templateUrl: './list-pomo.component.html',
    styleUrls: ['./list-pomo.component.scss'],
    providers: [ListPomoService]

})

export class ListPomoComponent implements OnInit {
    /*  Note:
    *   The ListPomoService item is reduced to variable s
    *   this choice were made to make the code easier to read
    *   and also to maintain
    *  */


    id: string;
    sub: Subscription;
    interval: any;
    item: IItem = this.s.getItem(id)


    constructor(private route: ActivatedRoute ,private s: ListPomoService) {
        this.sub = this.route.params.subscribe(
            (p) => this.id = p['id']
        );
    }


    ngOnInit(): void {
    }

    updateItem(){
        this.s.updateItem(this.item)
    }
    timerPause() {
        this.s.isActive = false
        this.s.updateItem()
        clearInterval(this.interval)
    }
    timerStart(mins: number) {
        if (this.s.seconds<= 0)
            this.s.seconds = mins * 60;

        this.s.isActive = true;

        this.interval = setInterval(() => {

            this.s.seconds--;

            // each 5 sec the item get updated in LS
            if ( this.s.seconds % 5 === 0) this.s.updateItem();

            // When times ends, shouts an alert
            if ( this.s.seconds <= 0) {
                this.s.isActive = false;
                this.s.isFinished = true;
                clearInterval(this.interval);
                alert("🚨 It is Cool 😎. I wish you could share ");
                this.s.updateItem();
            }
        }, 1000);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}