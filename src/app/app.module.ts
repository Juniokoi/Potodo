import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListsComponent} from './lists/lists.component';
import {HomeComponent} from './home/home.component';
import {ListsModule} from "./lists/lists.module";
import {NotFoundComponent} from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [
        AppComponent,
        ListsComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ListsModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}