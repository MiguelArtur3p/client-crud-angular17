import { Component } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { ModalService } from '../../../shared/services/modal.service';
import { CidadeListModalComponent } from '../cidade-list-modal/cidade-list-modal.component';

@Component({
    selector: 'app-cidade-form-modal',
    templateUrl: './cidade-form-modal.component.html',
    styleUrl: './cidade-form-modal.component.css'
})
export class CidadeFormModalComponent
{
    constructor(private modalService: BsModalService, public _modalService: ModalService)
    {

    }

    alternarModal()
    {
        this._modalService.alternarModal(CidadeListModalComponent)
    }
}
