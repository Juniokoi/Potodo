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
    hasTimer = true;
    currentId = 0

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}