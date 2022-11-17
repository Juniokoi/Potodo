import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TimerService} from "./timer.service";
import {TimerRoutingModule} from "./timer-routing.module";

import {TimerComponent} from "./timer.component";
import {ListComponent} from "./modules/list/list.component";
import {PomodoroComponent} from "./modules/pomodoro/pomodoro.component";

import {ListGuard} from './guards/list.guard';
import {ListsResolver} from "./guards/lists.resolver";
import {TimerDeactivateGuard} from "./guards/timer-deactivate.guard";
import {ConfigComponent} from './modules/config/config.component';
import {ConfigResolver} from "./guards/config.resolver";
import {TooltipComponent} from '../shared/ui/tooltip/tooltip.component';
import {TooltipDirective} from '../shared/ui/tooltip/tooltip.directive';
import {AddItemComponent} from './modules/list/components/add-item/add-item.component';
import {DynamicService} from "./modules/list/components/services/dynamic.service";
import {CustomAutoFocus} from "../shared/directives/auto-focus.directive";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        TimerRoutingModule,
    ],
    declarations: [
        TimerComponent,
        ListComponent,
        PomodoroComponent,
        ConfigComponent,
        TooltipDirective,
        TooltipComponent,
        AddItemComponent,
        CustomAutoFocus
    ],
    providers: [TimerService, DynamicService, ListGuard, ConfigResolver, ListsResolver, TimerDeactivateGuard],

})
export class TimerModule {
}