import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertaModalComponent } from '../alerta-modal/alerta-modal.component';

@Injectable({
    providedIn: 'root'
})
export class AlertModalService
{
    bsModalRef!: BsModalRef;
    constructor(private modalService: BsModalService) { }

    private mostrarAlerta(mensagem: string, tipo: string, tempoParaFecharModal?: number)
    {
        setTimeout(() =>
        {
            this.bsModalRef = this.modalService.show(AlertaModalComponent, { backdrop: false });
            this.bsModalRef.content.tipo = tipo;
            this.bsModalRef.content.mensagem = mensagem;
        }, 260);


        if (tempoParaFecharModal)
        {
            setTimeout(() =>
            {
                this.bsModalRef.hide()
            }, tempoParaFecharModal)
        }
    }

    mostrarAlertarDanger(mensagem: string)
    {
        this.mostrarAlerta(mensagem, 'danger');
    }

    mostrarAlertarSuccess(mensagem: string, tempoParaFecharModal?: number)
    {
        this.mostrarAlerta(mensagem, 'success', tempoParaFecharModal);
    }
}
