import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralModule } from './menu-lateral/menu-lateral.module';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

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
