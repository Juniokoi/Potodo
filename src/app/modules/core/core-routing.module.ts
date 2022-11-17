import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {CoreComponent} from "./core.component";

export const routes: Routes = [
    { path: '', redirectTo: 'timer', pathMatch: 'full' },
    { path: 'timer', loadChildren: () =>
            import('../timer/timer.module').then(mod => mod.TimerModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }