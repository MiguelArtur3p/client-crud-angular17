import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { NavHeaderComponent } from './default-layout/nav-header/nav-header.component';
import { MenuLateralComponent } from './default-layout/menu-lateral/menu-lateral.component';

@NgModule({
    declarations: [AppComponent, DefaultLayoutComponent, NavHeaderComponent, MenuLateralComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        SharedModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot()
    ],
    exports: [],
    providers: [BsModalService],
    bootstrap: [AppComponent],
})
export class AppModule { }
