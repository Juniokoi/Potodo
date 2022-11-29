import {NgModule} from '@angular/core';

import {TimerService} from "./timer.service";
import {TimerRoutingModule} from "./timer-routing.module";

import {TimerComponent} from "./timer.component";
import {PomodoroComponent} from "./modules/pomodoro/pomodoro.component";

import {ListGuard} from './guards/list.guard';
import {ListsResolver} from "./guards/lists.resolver";
import {TimerDeactivateGuard} from "./guards/timer-deactivate.guard";
import {ConfigComponent} from './modules/config/config.component';
import {ConfigResolver} from "./guards/config.resolver";
import {ListModule} from "./modules/list/list.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports: [
        SharedModule,
        ListModule,

        TimerRoutingModule,
    ],
    declarations: [
        TimerComponent,
        PomodoroComponent,
        ConfigComponent,
    ],
    providers: [TimerService, ListGuard, ConfigResolver, ListsResolver, TimerDeactivateGuard],

})
export class TimerModule {
}