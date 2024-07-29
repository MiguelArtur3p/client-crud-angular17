import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { MenuLateralModule } from './menu-lateral/menu-lateral.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MenuLateralModule,
        ReactiveFormsModule,
        RouterModule,
        MatSlideToggleModule,
        HttpClientModule,
        SharedModule,
        ModalModule.forRoot(),
    ],
    exports: [],
    providers: [BsModalService],
    bootstrap: [AppComponent],
})
export class AppModule { }
