import
{ Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

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
import { ConfirmacaoModalComponent } from '../../shared/components/confirmacao-modal/confirmacao-modal.component';

@Component({
    selector: 'app-cliente-form',
    templateUrl: './cliente-form.component.html',
    styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent implements OnInit, OnDestroy, IFormCanDeactivate 
{
    clienteForm: FormGroup;
    id: number | undefined;
    operacao!: string | null;
    cliente: Cliente | undefined;
    cidadeNaoEncontrada: boolean = false;
    inscricao: Subscription | undefined;
    podeDesativar = false;
    progressoUpload = 0;

    @ViewChild('inputCidade', { static: false }) inputCidade!: ElementRef;
    @ViewChild('inputEstado', { static: false }) inputEstado!: ElementRef;
    @ViewChild('inputCodigoCidade', { static: false })
    inputCodigoCidade!: ElementRef;
    modalRef?: BsModalRef;

    constructor(
        private _formBuilder: FormBuilder,
        private _clienteService: ClienteService,
        private _cidadeService: CidadeService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _validarInputs: ValidarInputsService,
        private _cidadeValidator: CidadeValidatorService,
        private _modalService: ModalService,
        private _alertModalService: AlertModalService,
        private _tratarErrosService: TratarErrosService
    ) 
    {
        this.clienteForm = this._formBuilder.group({
            id: [''],
            nomeCliente: ['', Validators.required],
            cpf: ['', Validators.required],
            dataNascimento: ['', Validators.required],
            codigoCidade: [null, [Validators.required], this._cidadeValidator.validate.bind(this._cidadeValidator), { updateOn: 'change' }],
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

    mostrarCliente()
    {
        if (!this.cliente) return;
        this.clienteForm.patchValue(this.cliente);
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
        this.cliente?.numeroTelefone.map(numero => this.obterControlTelefones.push(this._formBuilder.control(numero)));
    }

    get obterControlTelefones()
    {
        return this.clienteForm.get('numeroTelefone') as FormArray
    }

    removerTelefone(controls: number)
    {
        this.obterControlTelefones.removeAt(controls)
    }

    adicionarTelefone()
    {
        this.obterControlTelefones.push(this._formBuilder.control(""))

    }

    obterParametrosRota()
    {
        this.id = this._route.snapshot.params['id'];
        this.operacao = this._route.snapshot.data['operacao'];
    }

    obterCidade(id: string)
    {
        this._cidadeService.obterRegistroPorId(Number(id))?.subscribe({
            next: cidade => this.mostrarCidade(cidade),
            error: error => { this.mostrarCidade(), this._tratarErrosService.tratarErros(error) },
            complete: () => console.log('completa')
        })
    }

    desativarInputs()
    {
        if (this.operacao == 'detalhes' || this.operacao == 'remover')
            this.clienteForm.disable();
    }

    validar()
    {
        if (this.clienteForm.valid)
            return true;
        else 
        {
            this._validarInputs.verificarValidacoesForm(this.clienteForm)
            alert('Preencha todos os campos obrigatório');
            return false;
        }
    }

    redirecionar()
    {
        if (this._modalService.modalEstaAberta) return
        this._router.navigate(['/cliente']);
    }

    criarCliente()
    {
        this.cliente = Object.assign({}, this.clienteForm.value);
    }

    salvar()
    {
        if (!this.validar()) return;
        this.criarCliente();
        this.podeDesativar = true;

        this._clienteService.salvar(this.cliente!)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionar()
        })
    }

    abrirModalDeConfirmacao()
    {
        this._modalService.abrirModalConfirmacao(ConfirmacaoModalComponent, 'Confirmação', 'Tem certeza que deseja excluir esta cidade?', { class: 'modal-sm' })?.pipe(take(1)).subscribe(resposta => resposta ? this.remover() : this._modalService.modalRef?.hide())
    }

    abrirModal()
    {
        this._modalService.abrirModal(CidadeListModalComponent)
    }

    remover()
    {
        if (!this.id) return;
        this._clienteService.remover(this.id)?.subscribe({
            next: success => this._alertModalService.mostrarAlertarSuccess('Operação executada com sucesso!', 2000),
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.redirecionar()
        })
    }

    desativarRota(): boolean
    {
        if (this.clienteForm.dirty)
            return this.podeDesativar ? true : false
        else
            return true;
    }

    definirIdCidade(idCidadeSelecionada: string)
    {
        if (!idCidadeSelecionada) return;
        this.obterCidade(idCidadeSelecionada)
        this.clienteForm.get('codigoCidade')?.setValue(idCidadeSelecionada);
    }

    verificarCampoInvalid(campo: string)
    {
        return this._validarInputs.verificarValidTouch(this.clienteForm, campo);
    }

    verificarCampoEmail()
    {
        return this._validarInputs.verificarEmailInvalido(this.clienteForm)
    }

    aplicarCssCamposInvalidos(campo: string)
    {
        return this._validarInputs.aplicaCssErro(this.clienteForm, campo)
    }

    ngOnInit()
    {
        this.inscricao = this._cidadeService.idCidadeSelecionadaEmitter.subscribe(id =>
        {
            this.definirIdCidade(id);
            this._modalService.fecharModal();
            this._modalService.modalEstaAberta = false;
        })

        this.obterParametrosRota();
        if (this.operacao == 'adicionar' || !this.id) return;
        this._clienteService.obterRegistroPorId(this.id)?.subscribe({
            next: dado => this.cliente = dado,
            error: error => { this._tratarErrosService.tratarErros(error), this.redirecionar() },
            complete: () =>
            {
                this.mostrarCliente(), this.mostrarTelefones();
                this.obterCidade(this.inputCodigoCidade.nativeElement.value.toString());
                this.desativarInputs();
            }
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


