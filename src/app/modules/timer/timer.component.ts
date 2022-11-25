import {Component, ElementRef, OnInit} from '@angular/core';
import {TimerService} from "./timer.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    sub: Subscription;
    hasRoute!: boolean;
    currentRoute?: string;

    constructor(
        private _service: TimerService,
        private _er: ElementRef
    ) {
        this.sub = this._service.route$.subscribe(
            route => {
                this.hasRoute = route != ""
                this.currentRoute = route
            }
        )
    }

    ngOnInit(): void {
        console.log(window.innerWidth)
    }

    resetRoute() {
        this._service.route$.next("")
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}