import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Routes} from "@angular/router";
import {Subscription} from "rxjs";
import {ListsService} from "../lists.service";

@Component({
    selector: 'list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
   @Input() content!: string;
   @Input() id!: string;

    constructor(private listService: ListsService) { }
    ngOnInit(): void { }

    removeTask(task: string) {
        this.listService.removeItem(task);
    }

}