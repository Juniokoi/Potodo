import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TimerComponent} from "./components/timer.component";
import {ListComponent} from "./components/list/list.component";
import {PomodoroComponent} from "./components/pomodoro/pomodoro.component";

import {ListGuard} from './guards/list.guard';
import {ListsResolver} from "./guards/lists.resolver";
import {TimerDeactivateGuard} from "./guards/timer-deactivate.guard";
import {ConfigComponent} from "./components/config/config.component";

export const routes: Routes = [
    { path: '', component: TimerComponent, children: [
        {
            path: '',
            component: ListComponent,
        },
        { path: 'config', component: ConfigComponent },
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