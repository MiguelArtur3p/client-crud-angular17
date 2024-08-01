import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { IFormCanDeactivate } from '../../guards/iform-candeactivate';
import { ValidarInputsService } from '../../shared/services/validar-inputs.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { ModalService } from '../../shared/services/modal.service';
import { CidadeService } from '../services/cidade.service';
import { CidadeListModalComponent } from '../modals/cidade-list-modal/cidade-list-modal.component';
import { ConfirmacaoModalComponent } from '../../shared/components/confirmacao-modal/confirmacao-modal.component';
import { Cidade } from '../models/Cidade';

@Component({
    selector: 'cidade-form',
    templateUrl: './cidade-form.component.html',
    styleUrl: './cidade-form.component.css',
})
export class CidadeFormComponent implements OnInit, IFormCanDeactivate 
{
    id: number | undefined;
    operacao: string | undefined;
    cidadeForm: FormGroup;
    cidade: Cidade | undefined;
    podeDesativar = false;

    constructor(
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _cidadeService: CidadeService,
        private _router: Router,
        private _validarInputs: ValidarInputsService,
        public _modalService: ModalService,
        public _alertModalService: AlertModalService,
        private _tratarErrosService: TratarErrosService
    ) 
    {
        this.obterParametrosRota();

        this.cidadeForm = this._formBuilder.group
            ({
                id: [null],
                cidade: ['', Validators.required],
                estado: ['', Validators.required],
                ibge: ['', Validators.required],
            });
    }

    //caso a operacao estiver sendo executada de uma modal, a rota é passada manualmente
    obterParametrosRota() 
    {
        if (this._modalService.modalEstaAberta)
        {
            this.operacao = this._cidadeService.operacao;
            this.id = Number(this._cidadeService.rotaId);
        }
        else
        {
            this.id = this._route.snapshot.params['id'];
            this.operacao = this._route.snapshot.data['operacao'];
        }
    }

    validar() 
    {
        if (this.cidadeForm.valid)
            return true;
        else 
        {
            this._validarInputs.verificarValidacoesForm(this.cidadeForm)
            alert('Preencha todos os campos marcado em vermelho');
            return false;
        }
    }

    desativarInputs() 
    {
        if (this.operacao == 'detalhes' || this.operacao == 'remover')
            this.cidadeForm.disable();
    }

    mostrarCidade() 
    {
        if (!this.cidade) return;
        this.cidadeForm.patchValue(this.cidade);
    }

    criarCidade() 
    {
        this.cidade = Object.assign({}, this.cidadeForm.value);
    }

    redirecionar() 
    {
        console.log('foi')
        if (this._modalService.modalEstaAberta)
            this._modalService.alternarModal(CidadeListModalComponent);
        else
            this._router.navigate(['/cidade']);
    }

    salvar() 
    {
        if (!this.validar()) return;
        this.criarCidade();
        this.podeDesativar = true;

        this._cidadeService.salvar(this.cidade!)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionar()
        })
    }

    desativarRota(): boolean 
    {
        if (this.cidadeForm.dirty)
            return this.podeDesativar ? true : false
        else
            return true
    }

    abrirModalDeConfirmacao() 
    {
        this._modalService.abrirModalConfirmacao(ConfirmacaoModalComponent, 'Confirmação', 'Tem certeza que deseja excluir esta cidade?', { class: 'modal-sm' })?.pipe(take(1)).subscribe(resposta => resposta ? this.remover() : this._modalService.modalRef?.hide())
    }

    remover()
    {
        if (!this.id) return;
        this._cidadeService.remover(this.id)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionar()
        })
    }

    aplicarCssCamposInvalidos(campo: string)
    {
        return this._validarInputs.aplicaCssErro(this.cidadeForm, campo)
    }

    verificarCampoInvalid(campo: string)
    {
        return this._validarInputs.verificarValidTouch(this.cidadeForm, campo)
    }

    ngOnInit() 
    {
        if (this.operacao == 'adicionar' || !this.id) return;
        this._cidadeService.obterRegistroPorId(this.id)?.subscribe({
            next: cidade => this.cidade = cidade,
            error: error => { this._tratarErrosService.tratarErros(error), this.redirecionar() },
            complete: () =>
            {
                this.mostrarCidade();
                this.desativarInputs();
            }
        });
    };


}
