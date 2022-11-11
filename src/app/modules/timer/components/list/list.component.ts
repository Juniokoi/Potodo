import {Component, OnInit} from '@angular/core';
import {TimerService} from "../../timer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IItem } from '../../../shared/interfaces/IItem';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    form: FormGroup;
    items: IItem[] = this.listService.getListItems();
    title = 'Potodo';
    hoverItem: string = "";

    constructor(
        private listService: TimerService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            task: [null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(256)]]
        });
    }
    ngOnInit(): void {
    }

    removeTask(task: string) {
        this.listService.removeItem(task);
    }

    isValid() {
        return this.form.get('task')!.valid
    }
    addTask() {
        if (this.form.valid) {
            this.listService.addItem(this.form.value);
            this.form.reset()
        }
    }

}