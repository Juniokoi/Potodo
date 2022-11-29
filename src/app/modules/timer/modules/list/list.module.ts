import {NgModule} from '@angular/core';
import {AddItemComponent} from "./components/add-item/add-item.component";
import {DynamicService} from "./services/dynamic.service";
import {ListComponent} from "./list.component";
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
    declarations: [
        AddItemComponent,
        CheckboxComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        AddItemComponent,
        CheckboxComponent,
        ListComponent,
    ],
    providers: [DynamicService]
})
export class ListModule {
}