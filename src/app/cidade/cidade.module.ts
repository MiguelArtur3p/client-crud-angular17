import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { CidadeRoutingModule } from './cidade.routing.module';
import { CampoControlInvalidModule } from '../shared/components/ContenteCampoInvalid/campo-control-invalid.module';
import { CidadeListComponent } from './cidade-list/cidade-list.component';
import { CidadeFormComponent } from './cidade-form/cidade-form.component';
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
        ModalModule.forRoot(),
        PaginationModule.forRoot()

    ],
    exports: [CidadeListComponent, CidadeFormComponent, CidadeListModalComponent, CidadeFormModalComponent],
})
export class CidadeModule { }
