import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListsComponent} from "./lists.component";
import {ListPomoComponent} from "./list-pomo/list-pomo.component";

const routes: Routes = [{
    path: '', component: ListsComponent, children: [
        {path: 'timer/:id', component: ListPomoComponent},
    ]
},];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListRoutingModule {
}