import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
    hasTimer = true;
    currentId = 0

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}