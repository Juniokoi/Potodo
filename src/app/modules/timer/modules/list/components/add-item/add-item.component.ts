import {Component, OnInit} from '@angular/core';
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
    title: string = "Yay"

    form: FormGroup;
    inputFocused = false;

    constructor(
        private _service: TimerService,
        private _fb: FormBuilder,
        private _serv: DynamicService
    ) {
        this.form = this._fb.group({
            task: [null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(256)]],
            sections: [1, [Validators.required, Validators.min(1), Validators.max(12)]]
        });
    }

    ngOnInit(): void {
    }

    applyVisual() {
        const _focused = this.inputFocused;
        const _empty = this.form.get('task')?.value !== null && this.form.get('task')?.value !== "";

        return {
            'form__task--focused':  _focused || _empty
        }
    }

    handleLabel(status: string): void {
        switch (status) {
            case "focus":
                this.inputFocused = true;
                break
            case "blur":
                this.inputFocused = false;
                break
        }
        this.applyVisual();
    }

    isValid() {
        return this.form.get('task')!.valid
    }

    cancel() {
        this._serv.sendData(false)
    }

    addTask() {
        if (this.form.valid) {
            this._service.addItem(this.form.value);
            this.form.reset()
        }
        this.cancel()
    }
    buttonValidateClass() {
        return {
            'actions__btn-save--valid': this.isValid(),
            'actions__btn-save--invalid': !this.isValid()
        }
    }

}