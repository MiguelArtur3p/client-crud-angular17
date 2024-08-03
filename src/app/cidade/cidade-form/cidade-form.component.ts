import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IFormCanDeactivate } from '../../guards/iform-candeactivate';
import { ValidarInputsService } from '../../shared/services/validar-inputs.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { ModalService } from '../../shared/services/modal.service';
import { CidadeService } from '../services/cidade.service';
import { CidadeListModalComponent } from '../modals/cidade-list-modal/cidade-list-modal.component';
import { Cidade } from '../models/Cidade';
import { BaseFormComponent } from '../../shared/components/base-form/base-form.component';

@Component({
    selector: 'cidade-form',
    templateUrl: './cidade-form.component.html',
    styleUrl: './cidade-form.component.css',
})
export class CidadeFormComponent extends BaseFormComponent implements OnInit, IFormCanDeactivate 
{
    cidade: Cidade | undefined;

    constructor(
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _cidadeService: CidadeService,
        private _router: Router,
        public _alertModalService: AlertModalService,
        override _tratarErrosService: TratarErrosService,
        override _validarInputs: ValidarInputsService,
        override _modalService: ModalService,
    ) 
    {
        super(_modalService, _validarInputs, _tratarErrosService);

        this.obterParametrosRota();

        this.formulario = this._formBuilder.group
            ({
                id: [null],
                cidade: ['', Validators.required],
                estado: ['', Validators.required],
                ibge: ['', Validators.required],
            });
    }

    ngOnInit() 
    {
        if (this.operacao == 'adicionar' || !this.id) return;
        this.obterCidadePorId();
    };

    //caso a operacao estiver sendo executada de uma modal, a rota é passada manualmente
    override obterParametrosRota() 
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

    override redirecionarAposOperacao() 
    {
        console.log('foi')
        if (this._modalService.modalEstaAberta)
            this._modalService.alternarModal(CidadeListModalComponent);
        else
            this._router.navigate(['/cidade']);
    }

    protected override tratarSucessoAposObterRegistroPorId(): void
    {
        this.mostrarCidade();
        this.desativarInputs();
    }

    override validar() 
    {
        if (this.formulario.valid)
            return true;
        else 
        {
            this._validarInputs.verificarValidacoesForm(this.formulario)
            alert('Preencha todos os campos marcado em vermelho');
            return false;
        }
    }

    override salvar() 
    {
        if (!this.validar()) return;
        this.criarCidade();
        this.podeDesativar = true;

        this._cidadeService.salvar(this.cidade!)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionarAposOperacao()
        })
    }

    override remover()
    {
        if (!this.id) return;
        this._cidadeService.remover(this.id)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionarAposOperacao()
        })
    }

    obterCidadePorId()
    {
        this._cidadeService.obterRegistroPorId(this.id!)?.subscribe({
            next: cidade =>
            {
                this.cidade = cidade;
                this.tratarSucessoAposObterRegistroPorId()
            },
            error: error => this.tratarErrorAposObterRegistroPorId(error)
        });
    }

    mostrarCidade() 
    {
        if (!this.cidade) return;
        this.formulario.patchValue(this.cidade);
    }

    criarCidade() 
    {
        this.cidade = Object.assign({}, this.formulario.value);
    }
}
