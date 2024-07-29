import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteRoutingModule } from './cliente.routing.module';
import { CampoControlInvalidModule } from '../shared/ContenteCampoInvalid/campo-control-invalid.module';
import { CidadeModule } from '../cidade/cidade.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@NgModule({
    declarations: [ClienteFormComponent, ClienteListComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
        CampoControlInvalidModule,
        CidadeModule,
        ModalModule.forRoot()
    ],
    exports: [ClienteFormComponent, ClienteListComponent],

})
export class ClienteModule { }
