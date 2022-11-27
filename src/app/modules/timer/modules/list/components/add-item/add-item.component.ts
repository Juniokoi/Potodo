import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TimerService} from "../../../../timer.service";
import {DynamicService} from "../services/dynamic.service";

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

    left: number = 0;
    top: number = 0;
    title: string = ""

    form: FormGroup;

    constructor(
        private _service: TimerService,
        private _fb: FormBuilder,
        private _serv: DynamicService
    ) {
        this.form = this._fb.group({
            task: [null, [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
            sections: [1, [Validators.required, Validators.min(1), Validators.max(12)]]
        });
    }

    ngOnInit(): void {
    }

    isValid() {
        return this.form.controls['task'].valid;
    }

    cancel($event: boolean = true) {
        this._serv.sendData(false)
    }

    getTask($event:string) {
        this.form.controls['task'].patchValue($event)
    }

    addTask() {
        if (this.form.valid) {
            this._service.addItem(this.form.value);
            this.form.reset()
            this.cancel()
        }
    }

    buttonValidateClass() {
        return {
            'actions__btn-save--valid': this.isValid(),
            'actions__btn-save--invalid': !this.isValid()
        }
    }

}