import { Component, ComponentRef, Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';
import { Observable, Subject, of, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService
{
    modalRef?: BsModalRef;
    modalEstaAberta: boolean = false;

    constructor(private _bsModalService: BsModalService) { }

    abrirModal(component: any, titulo?: string, mensagem?: string, config: any = {
        class: 'modal-xl',
        keyboard: false,
        ignoreBackdropClick: true
    }): void
    {
        this.modalEstaAberta = true;
        this.modalRef = this._bsModalService.show(component, config);
    }

    abrirModalConfirmacao(component: any, titulo?: string, mensagem?: string, config: any = {
        class: 'modal-xl',
        keyboard: false,
        ignoreBackdropClick: true
    }): Subject<boolean>
    {
        this.modalRef = this._bsModalService.show(component, config)
        this.modalRef.content.titulo = titulo;
        this.modalRef.content.mensagem = mensagem;
        return (<ConfirmacaoModalComponent>this.modalRef.content).resultadoConfirmacao;
    }

    fecharModal()
    {
        this.modalRef?.hide();
        this.modalEstaAberta = false;
    }


    alternarModal(component: any)
    {
        this.fecharModal();
        setTimeout(() =>
        {
            this.abrirModal(component)
        }, 150)
    }
}
