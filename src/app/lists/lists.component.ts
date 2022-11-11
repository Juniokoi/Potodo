import {Component, OnInit} from '@angular/core';
import {ListsService} from "./lists.service";
import {IItem} from "./IItem";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})

export class ListsComponent implements OnInit {
    form: FormGroup;
    items: IItem[] = this.listService.getListItems();
    title = 'Potodo';
    hideOptions: boolean;
    hasTimer = true;
    currentId = 0

    constructor(
        private listService: ListsService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            task: [null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(256)]]
        });
        this.hideOptions = true;
    }

    ngOnInit(): void {
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