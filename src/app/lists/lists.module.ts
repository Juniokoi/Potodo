import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListItemComponent} from "./list-item/list-item.component";
import {ListPomoComponent} from "./list-pomo/list-pomo.component";
import {FormsModule} from "@angular/forms";
import {ListsService} from "./lists.service";
import {ListRoutingModule} from "./lists-routing.module";


@NgModule({
    declarations: [
        ListItemComponent,
        ListPomoComponent
    ],
    imports: [
        CommonModule,
        ListRoutingModule,
        FormsModule
    ],
    exports: [
        ListItemComponent
    ],
    providers: [ListsService]
})
export class ListsModule {
}