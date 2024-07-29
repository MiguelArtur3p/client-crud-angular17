import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ClienteRoutingModule } from '../cliente/cliente.routing.module';
import { CidadeRoutingModule } from '../cidade/cidade.routing.module';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        ClienteRoutingModule,
        CidadeRoutingModule,
    ],
    exports: [NavbarComponent],
})
export class MenuLateralModule { }
