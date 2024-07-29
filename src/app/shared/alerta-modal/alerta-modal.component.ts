import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-alerta-modal',
    templateUrl: './alerta-modal.component.html',
    styleUrl: './alerta-modal.component.css'
})
export class AlertaModalComponent
{
    @Input() mensagem!: string;
    @Input() tipo = 'success';

    constructor(public bsModalRef: BsModalRef) { }

}
