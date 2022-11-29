import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDirective} from './ui/tooltip/tooltip.directive';
import {TextInputComponent} from './ui/text-input/text-input.component';
import {TooltipComponent} from './ui/tooltip/tooltip.component';
import {CustomAutoFocus} from './directives/auto-focus.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";


@NgModule({
    declarations: [
        TooltipDirective,
        TooltipComponent,
        TextInputComponent,
        CustomAutoFocus,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    exports: [
        TooltipDirective,
        TooltipComponent,
        TextInputComponent,
        CustomAutoFocus,

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
})
export class SharedModule {
}