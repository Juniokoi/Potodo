import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListItemComponent} from "./list-item/list-item.component";
import {ListPomoComponent} from "./list-pomo/list-pomo.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListsService} from "./lists.service";
import {ListRoutingModule} from "./lists-routing.module";
import {ListGuard} from './guards/list.guard';
import {ListDeactivateGuard} from "./guards/list-deactivate.guard";
import {ListsResolver} from "./guards/lists.resolver";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        ListItemComponent,
        ListPomoComponent,
    ],
    imports: [
        CommonModule,
        ListRoutingModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    exports: [
        ListItemComponent
    ],
    providers: [ListsService, ListGuard, ListDeactivateGuard, ListsResolver]
})
export class ListsModule {
}