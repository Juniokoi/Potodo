import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {TimerModule} from "../timer/timer.module";
import {CoreRoutingModule} from './core-routing.module';

import {CoreComponent} from "./core.component";

@NgModule({
    declarations: [
        CoreComponent,
    ],
    imports: [
        BrowserModule,

        CoreRoutingModule,
        TimerModule,
    ],
    providers: [],
    bootstrap: [CoreComponent],
})

export class CoreModule {
}