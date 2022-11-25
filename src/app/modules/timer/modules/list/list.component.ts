import {Component, Injector, OnInit} from '@angular/core';
import {TimerService} from "../../timer.service";
import {IItem} from '../../../shared/interfaces/IItem';
import {TooltipPosition} from "../../../shared/ui/tooltip/TooltipPosition.enums";
import {AddItemComponent} from "./components/add-item/add-item.component";
import {DynamicService} from "./components/services/dynamic.service";

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    addItemComponent:any = AddItemComponent;
    componentSwitcher!: boolean;

    items: IItem[] = this._service.getListItems();
    hoverItem = "";
    tooltipPosition: TooltipPosition = TooltipPosition.BELOW;

    constructor(
        private _injector: Injector,
        private _service: TimerService,
        private _dyn: DynamicService,
    ) {
        this.componentSwitcher = false;
        this._dyn.output$.subscribe((data) => {
            console.log(data);
            this.componentSwitcher = data;
        })
    }

    ngOnInit(): void {
    }

    removeTask(task: string) {
        this._service.removeItem(task);
    }

    checkTask(id: string, content: boolean) {
        let _temp = this._service.getItem(id);
        _temp.complete = content;
        this._service.checkItem(id, _temp.complete)
    }

    setRoute(id: string) {
        this._service.route$.next(id)
    }

}