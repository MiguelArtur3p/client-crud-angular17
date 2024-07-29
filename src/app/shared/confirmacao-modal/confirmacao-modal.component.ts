import { Component, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CidadeListModalComponent } from '../../cidade/modals/cidade-list-modal/cidade-list-modal.component';

@Component({
    selector: 'app-confirmacao-modal',
    templateUrl: './confirmacao-modal.component.html',
    styleUrl: './confirmacao-modal.component.css'
})
export class ConfirmacaoModalComponent
{
    @Input() titulo!: string;
    @Input() mensagem!: string;
    resultadoConfirmacao: Subject<boolean>;

    constructor(public _modalService: ModalService, private bsModalService: BsModalService)
    {
        this.resultadoConfirmacao = new Subject();
    }


    confirmar(resposta: boolean)
    {
        if (resposta)
        {
            this.bsModalService.hide()
            this.resultadoConfirmacao.next(resposta);
        }
        else
        {
            this.resultadoConfirmacao.next(resposta);
        }

    }

}
