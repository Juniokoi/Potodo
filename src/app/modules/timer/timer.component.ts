import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    //TODO: Make method to redirect user to the last active route
    hasTimer = true;
    currentId = 0

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}