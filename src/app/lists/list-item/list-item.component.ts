import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Routes} from "@angular/router";
import {Subscription} from "rxjs";
import {ListsService} from "../lists.service";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
   @Input() content!: string;
   @Input() id!: string;
    hideOptions: boolean;

    constructor(private listService: ListsService) {
        this.hideOptions = true;
    }
    ngOnInit(): void {
    }

    removeTask(task: string) {
        this.listService.removeItem(task);
    }

}