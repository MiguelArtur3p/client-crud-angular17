import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { CampoControlInvalidModule } from '../shared/components/ContenteCampoInvalid/campo-control-invalid.module';
import { SharedModule } from '../shared/shared.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
    declarations: [LoginFormComponent, UsuarioFormComponent],
    imports: [CommonModule, UsuarioRoutingModule, ReactiveFormsModule, FormsModule, CampoControlInvalidModule, SharedModule],
    exports: [LoginFormComponent, UsuarioFormComponent],
})
export class UsuarioModule { }
