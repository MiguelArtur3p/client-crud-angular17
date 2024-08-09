import
{ Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Cliente } from '../models/Cliente';
import { Cidade } from '../../cidade/models/Cidade';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';
import { CidadeValidatorService } from '../../cidade/services/cidade-validator.service';
import { ClienteService } from '../services/cliente.service';
import { ValidarInputsService } from '../../shared/services/validar-inputs.service';
import { ModalService } from '../../shared/services/modal.service';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { CidadeService } from '../../cidade/services/cidade.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { uploadProgresso, filtrarResposta } from '../../shared/services/rxjs-operators';
import { CidadeListModalComponent } from '../../cidade/modals/cidade-list-modal/cidade-list-modal.component';
import { BaseFormComponent } from '../../shared/components/base-form/base-form.component';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent extends BaseFormComponent implements OnInit, OnDestroy, IFormCanDeactivate 
{
    cliente: Cliente | undefined;
    cidadeNaoEncontrada: boolean = false;
    inscricao: Subscription | undefined;
    progressoUpload = 0;
    override formulario = this._formBuilder.group({
        id: [''],
        nome: ['', Validators.required],
        cpf: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        codigoCidade: ['', [Validators.required], this._cidadeValidator.validate.bind(this._cidadeValidator), { updateOn: 'change' }],
        pais: ['', Validators.required],
        endereco: this._formBuilder.group({
            rua: ['', Validators.required],
            numeroCasa: ['', Validators.required],
            bairro: ['', Validators.required],
        }),
        numeroTelefone: this._formBuilder.array([
            this._formBuilder.control('')
        ]),
        numeroCelular: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });

    @ViewChild('inputCidade', { static: false })
    inputCidade!: ElementRef;
    @ViewChild('inputEstado', { static: false })
    inputEstado!: ElementRef;
    @ViewChild('inputCodigoCidade', { static: false })
    inputCodigoCidade!: ElementRef;
    modalRef?: BsModalRef;

    constructor(

        private _clienteService: ClienteService,
        private _cidadeService: CidadeService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _cidadeValidator: CidadeValidatorService,
        private _alertModalService: AlertModalService,
        override _tratarErrosService: TratarErrosService,
        public override _validarInputs: ValidarInputsService,
        override _modalService: ModalService
    ) 
    {
        super(_modalService, _validarInputs, _tratarErrosService);
    }

    ngOnInit()
    {
        this.obterParametrosRota();
        this.obterCidadeAoSelecionar();
        this.obterCliente();
    }

    override obterParametrosRota()
    {
        this.id = this._route.snapshot.params['id'];
        this.operacao = this._route.snapshot.data['operacao'];
    }

    override redirecionarAposOperacao()
    {
        if (this._modalService.modalEstaAberta) return
        this._router.navigate(['/cliente']);
    }

    override tratarSucessoAposObterRegistroPorId(): void
    {
        this.mostrarCliente(), this.mostrarTelefones();
        this.obterCidade(this.inputCodigoCidade.nativeElement.value.toString());
        this.desativarInputs();
    }

    override validar()
    {
        if (this.formulario.valid)
            return true;
        else 
        {
            this._validarInputs.verificarValidacoesForm(this.formulario)
            alert('Preencha todos os campos obrigatório');
            return false;
        }
    }

    override salvar()
    {
        if (!this.validar()) return;
        this.criarCliente();
        this.podeDesativar = true;

        this._clienteService.salvar(this.cliente!)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionarAposOperacao()
        })
    }

    override remover()
    {
        if (!this.id) return;
        this._clienteService.remover(this.id)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionarAposOperacao()
        })
    }

    obterCliente()
    {
        if (this.operacao == 'adicionar' || !this.id) return;

        this._route.data.subscribe(data =>
        {
            this.cliente = data['cliente'];
            this.tratarSucessoAposObterRegistroPorId()
        })
    }

    mostrarCliente()
    {
        if (!this.cliente) return;
        this.formulario.patchValue(this.cliente);
    }

    mostrarCidade(cidade?: Cidade)
    {
        if (!cidade) 
        {
            this.inputCidade.nativeElement.value = '';
            this.inputEstado.nativeElement.value = '';
        }
        else 
        {
            this.inputCidade.nativeElement.value = cidade.cidade;
            this.inputEstado.nativeElement.value = cidade.estado;
        }
    }

    mostrarTelefones()
    {
        this.removerTelefone(0);
        this.cliente?.numeroTelefone!.map(numero => this.obterControlTelefones.push(this._formBuilder.control(numero)));
    }

    criarCliente()
    {
        this.cliente = Object.assign({}, this.formulario.getRawValue());
    }

    criarArquivo(event: any)
    {
        let arquivos = new Set<File>();
        const arquivosSelecionados = <FileList>event.srcElement.files;
        for (let i = 0; i < arquivosSelecionados.length; i++)
        {
            arquivos.add(arquivosSelecionados[i]);
        }
        this.progressoUpload = 0;

        this.uparArquivo(arquivos);
    }

    uparArquivo(arquivos: Set<File>)
    {
        if (arquivos && arquivos.size > 0)
        {
            this._clienteService.enviarArquivo(arquivos).pipe(uploadProgresso(process =>
            {
                this.progressoUpload = process;
            }), filtrarResposta()).subscribe({
                next: success => console.log('arquivo upado'),
                error: error => this._tratarErrosService.tratarErros(error),
                complete: () => console.log('upload completo')
            })
        }
    }

    removerTelefone(controls: number)
    {
        this.obterControlTelefones.removeAt(controls)
    }

    adicionarTelefone()
    {
        this.obterControlTelefones.push(this._formBuilder.control(""))

    }

    get obterControlTelefones()
    {
        return this.formulario.get('numeroTelefone') as FormArray
    }

    obterCidade(id: string)
    {
        this._cidadeService.obterRegistroPorId(Number(id))?.subscribe({
            next: cidade => this.mostrarCidade(cidade),
            error: error => { this.mostrarCidade(), this._tratarErrosService.tratarErros(error) },
        })
    }

    abrirModal()
    {
        this._modalService.abrirModal(CidadeListModalComponent)
    }


    definirIdCidade(idCidadeSelecionada: string)
    {
        if (!idCidadeSelecionada) return;
        this.obterCidade(idCidadeSelecionada)
        this.formulario.get('codigoCidade')?.setValue(idCidadeSelecionada)
    }

    obterCidadeAoSelecionar()
    {
        this.inscricao = this._cidadeService.idCidadeSelecionadaEmitter.subscribe(id =>
        {
            this.definirIdCidade(id);
            this._modalService.fecharModal();
            this._modalService.modalEstaAberta = false;
        })
    }

    ngOnDestroy()
    {
        this.inscricao?.unsubscribe();
    }
}


function of(arg0: { cidadeInvalida: boolean; }): any
{
    throw new Error('Function not implemented.');
}


