import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { ClienteRoutingModule } from './cliente.routing.module';
import { CampoControlInvalidModule } from '../shared/components/ContenteCampoInvalid/campo-control-invalid.module';
import { CidadeModule } from '../cidade/cidade.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

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
