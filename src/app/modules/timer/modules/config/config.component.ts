import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TimerService} from "../../timer.service";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    form: FormGroup;

    constructor(
        private _builder: FormBuilder,
        private _service: TimerService
    ) {
        this.form = this._builder.group({
            pomoTimer: [null]
        })
    }

    ngOnInit(): void {
    }

}