import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CidadeFormComponent } from './cidade-form/cidade-form.component';
import { CidadeRoutingModule } from './cidade.routing.module';
import { CampoControlInvalidModule } from '../shared/ContenteCampoInvalid/campo-control-invalid.module';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CidadeListModalComponent } from './modals/cidade-list-modal/cidade-list-modal.component';
import { CidadeFormModalComponent } from './modals/cidade-form-modal/cidade-form-modal.component';

@NgModule({
    declarations: [CidadeListComponent, CidadeFormComponent, CidadeListModalComponent, CidadeFormModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CidadeRoutingModule,
        CampoControlInvalidModule,
        HttpClientModule,
        ModalModule.forRoot()
    ],
    exports: [CidadeListComponent, CidadeFormComponent, CidadeListModalComponent, CidadeFormModalComponent],
})
export class CidadeModule { }
