import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

    sub: Subscription;
    interval: any;
    item!: IItem;
    isActive: boolean = false;

    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'determinate';
    percentage: number = 0;

    sec: number = 0;
    minutes: string = "00";
    extraSeconds: string = "00";


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ListsService
    ) {
        this.sub = this.route.data.subscribe(
            ({tasks}) => {
                this.item = tasks;
            }
        );


    }

    ngOnInit(): void {
    }

    canDeactivate(): boolean {
        if (this.isActive) {
            if (confirm("O seu pomodoro esta rolando, sair da página irá pausa-lo<br>Tem certeza que deseja sair?")) {
                this.timerPause();
                return true;
            }
            this.isActive = true
            this.router.navigate([`/app/${this.item.id}`]).then(r => r);
            return false;
        }
        return true;
    }

    updateItem() {
        this.service.updateItem(this.item);
    }

    updateTimer(): void {
        let minutes = Math.floor(this.sec / 60);
        let extraSeconds = this.sec % 60;
        this.minutes = (minutes < 10 ? "0" + minutes : minutes).toString();
        this.extraSeconds = (extraSeconds < 10 ? "0" + extraSeconds : extraSeconds).toString();
    }


    calcPercentage(total: number, spent: number): number {
        return ((total - spent) / total) * 100;
    }

    timerStart(mins: number): void {
        const total_time = mins * 60;

        if (this.sec === 0) this.sec = total_time

        this.isActive = true;

        this.interval = setInterval(() => {
            this.percentage = this.calcPercentage(total_time, this.sec);
            this.updateTimer();

            this.sec--;

            // When times ends, shouts an alert
            if (this.sec <= 0) {
                this.isActive = false;
                this.item.complete = true;
                clearInterval(this.interval);
                alert("🚨 It is Cool 😎. I wish you could share ");
                this.updateItem();
            }
        }, 1000);
    }

    timerPause(): void {
        clearInterval(this.interval)
        this.isActive = false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}