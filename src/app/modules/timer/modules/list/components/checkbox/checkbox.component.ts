import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

    @Input() isChecked: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}