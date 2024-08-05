import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { take } from 'rxjs';

import { ModalService } from '../../services/modal.service';
import { ConfirmacaoModalComponent } from '../confirmacao-modal/confirmacao-modal.component';
import { ValidarInputsService } from '../../services/validar-inputs.service';
import { TratarErrosService } from '../../services/tratar-erros.service';

@Component({
    selector: 'app-base-form',
    template: ''
})
export class BaseFormComponent
{
    formulario!: FormGroup;
    id: number | undefined;
    operacao: string | undefined;
    podeDesativar = false;

    constructor(protected _modalService: ModalService, public _validarInputs: ValidarInputsService, protected _tratarErrosService: TratarErrosService
    ) { };

    protected obterParametrosRota() { };
    protected redirecionarAposOperacao() { };
    protected salvar() { };
    protected remover() { };
    protected tratarSucessoAposObterRegistroPorId() { };
    protected validar() { };
    protected _formBuilder = inject(NonNullableFormBuilder);

    desativarInputs() 
    {
        if (this.operacao == 'detalhes' || this.operacao == 'remover')
            this.formulario.disable();
    }

    abrirModalDeConfirmacao()
    {
        this._modalService.abrirModalConfirmacao(ConfirmacaoModalComponent, 'Confirmação', 'Tem certeza que deseja excluir esse registro?', { class: 'modal-sm' })?.pipe(take(1)).subscribe(resposta => resposta ? this.remover() : this._modalService.modalRef?.hide())
    }

    verificarCampoInvalid(campo: string)
    {
        return this._validarInputs.verificarValidTouch(this.formulario, campo);
    }

    verificarCampoEmail()
    {
        return this._validarInputs.verificarEmailInvalido(this.formulario)
    }

    aplicarCssCamposInvalidos(campo: string)
    {
        return this._validarInputs.aplicaCssErro(this.formulario, campo)
    }

    tratarErrorAposObterRegistroPorId(error: any)
    {
        this._tratarErrosService.tratarErros(error);
        this.redirecionarAposOperacao();
    }

    desativarRota(): boolean 
    {
        if (this.formulario.dirty)
            return this.podeDesativar ? true : false
        else
            return true
    }
}
