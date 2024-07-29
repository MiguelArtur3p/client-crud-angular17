import { Component } from '@angular/core';

import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-pesquisa-cidade-modal',
    templateUrl: './cidade-list-modal.component.html',
    styleUrl: './cidade-list-modal.component.css',
})
export class CidadeListModalComponent
{
    constructor(public _modalService: ModalService) { }
}
