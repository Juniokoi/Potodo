import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListsComponent} from "./lists.component";
import {ListPomoComponent} from "./list-pomo/list-pomo.component";
import { ListGuard } from './guards/list.guard';
import {ListDeactivateGuard} from "./guards/list-deactivate.guard";
import {ListsResolver} from "./guards/lists.resolver";

const routes: Routes = [{
    path: '', component: ListsComponent, children: [
        {path: ':id', component: ListPomoComponent, canActivate: [ListGuard], canDeactivate: [ListDeactivateGuard], resolve: {tasks: ListsResolver}},
    ]
},];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListRoutingModule {
}