import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TimerService} from "./timer.service";
import {TimerRoutingModule} from "./timer-routing.module";

import {TimerComponent} from "./components/timer.component";
import {ListComponent} from "./components/list/list.component";
import {PomodoroComponent} from "./components/pomodoro/pomodoro.component";

import {ListGuard} from './guards/list.guard';
import {ListsResolver} from "./guards/lists.resolver";
import {TimerDeactivateGuard} from "./guards/timer-deactivate.guard";


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
    ],
    providers: [TimerService,ListGuard, ListsResolver, TimerDeactivateGuard]


})
export class TimerModule {}