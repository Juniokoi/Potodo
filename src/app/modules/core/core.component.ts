import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    template: "<router-outlet></router-outlet>",
})
export class CoreComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}