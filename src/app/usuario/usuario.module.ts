import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { CampoControlInvalidComponent } from '../shared/ContenteCampoInvalid/campo-control-invalid.component';
import { CampoControlInvalidModule } from '../shared/ContenteCampoInvalid/campo-control-invalid.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [LoginFormComponent, UsuarioFormComponent],
    imports: [CommonModule, UsuarioRoutingModule, ReactiveFormsModule, FormsModule, CampoControlInvalidModule, SharedModule],
    exports: [LoginFormComponent, UsuarioFormComponent],
})
export class UsuarioModule { }
