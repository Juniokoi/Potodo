import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {IItem} from "../IItem";
import {ICanDeactivate} from "../guards/ICanDeactivate";
import {ListsService} from "../lists.service";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

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


    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'determinate';
    sub: Subscription;
    interval: any;
    item!: IItem;
    initial_interval: number = 0;
    percentage: number = 0;
    minutes: string = "00";
    extraSeconds: string = "00"

    constructor(
        private route: ActivatedRoute,
        private service: ListsService
    ) {
        this.sub = this.route.data.subscribe(
            ({tasks}) => {
                this.item = tasks;
            }
        );


    }

    ngOnInit(): void {
        this.percentage = this.item.percentage;
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

    updateItem() {
        this.service.updateItem(this.item);
    }

    updateTimer(): void {
        let minutes = Math.floor(this.item.seconds / 60);
        let extraSeconds = this.item.seconds % 60;
        this.minutes = (minutes < 10 ? "0" + minutes : minutes).toString()
        this.extraSeconds = (extraSeconds < 10 ? "0" + extraSeconds : extraSeconds).toString();
    }

    timerPause() {
        this.item.isActive = false;
        this.updateItem();
        clearInterval(this.interval);
    }

    timerStart(mins: number) {

        const total_time = mins * 60;
        this.initial_interval = mins * 60;

        if (this.item.seconds <= 0) {
            this.item.seconds = total_time;
        }

        this.item.isActive = true;

        this.interval = setInterval(() => {
            this.percentage = ((total_time - this.item.seconds) / total_time) * 100;
            this.item.seconds--;

            this.updateTimer();

            // each 5 sec the item get updated in LS
            if (this.item.seconds % 5 === 0) this.updateItem();

            // When times ends, shouts an alert
            if (this.item.seconds <= 0) {
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