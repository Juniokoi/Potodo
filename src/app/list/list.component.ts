import { Component, OnInit } from '@angular/core';
import {ListService} from "./list.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

    constructor(private listService: ListService) { }
    ngOnInit(): void {
    }

    title = 'Potodo';

    task: string = '';
    items: string[] = this.listService.getItems();

    addName() {
        this.listService.addItem(this.task)
        this.task = ''
    }
}