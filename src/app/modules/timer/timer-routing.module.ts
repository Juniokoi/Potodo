import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TimerComponent} from "./timer.component";
import {ListComponent} from "./modules/list/list.component";
import {PomodoroComponent} from "./modules/pomodoro/pomodoro.component";

import {ListGuard} from './guards/list.guard';
import {ListsResolver} from "./guards/lists.resolver";
import {TimerDeactivateGuard} from "./guards/timer-deactivate.guard";
import {ConfigComponent} from "./modules/config/config.component";
import {ConfigResolver} from "./guards/config.resolver";

export const routes: Routes = [
    { path: '', component: TimerComponent, children: [
        {
            path: '',
            component: ListComponent,
        },
        { path: 'config',
            component: ConfigComponent,
            resolve: {user: ConfigResolver}
        },
        {
            path: ':id',
            component: PomodoroComponent,
            canActivate: [ListGuard],
            canDeactivate: [TimerDeactivateGuard],
            resolve: {tasks: ListsResolver},
        },
    ], },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TimerRoutingModule {
}