import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Cidade } from '../models/Cidade';
import { CidadeService } from '../services/cidade.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { ModalService } from '../../shared/services/modal.service';
import { CidadeFormModalComponent } from '../modals/cidade-form-modal/cidade-form-modal.component';

@Component({
    selector: 'cidade-list',
    templateUrl: './cidade-list.component.html',
    styleUrl: './cidade-list.component.css',
})
export class CidadeListComponent implements OnInit
{
    cidades?: Cidade[] = [];
    modalEstaAberta: boolean = false;
    desativarOperacoes: boolean = false;
    unsubscribe$ = new Subject();
    carregandoDados: boolean = false;
    error$ = new Subject<boolean>();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cidadeService: CidadeService,
        public _modalService: ModalService,
        private _tratarErrosService: TratarErrosService
    )
    {

    }

    verificarOperacoes()
    {
        if (this._modalService.modalEstaAberta)
        {
            let rota = this._route.firstChild?.snapshot.routeConfig?.path;
            this.desativarOperacoes = rota?.includes('cliente/detalhes/:id') || rota?.includes('cliente/remover/:id') ? true : false
        }
        else
            this.desativarOperacoes = false
    }

    pesquisar(event: Event)
    {
        this.limparPesquisa()
        let pesquisa: string = (event.target as HTMLInputElement).value;

        if (!pesquisa) return;
        this.carregandoDados = true;
        this._cidadeService.obterRegistroPorNome(pesquisa)?.subscribe({
            next: cidades => { this.cidades = cidades },
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => this.carregandoDados = false
        })
    }

    limparPesquisa()
    {
        this.cidades = undefined
    }

    redirecionarParaOperacao(operacao?: string, id?: string)
    {
        if (this._modalService.modalEstaAberta)
        {
            this._cidadeService.definirParametrosRotas(operacao!, id?.toString());
            this._modalService.alternarModal(CidadeFormModalComponent);
        }
        else
            id ? this._router.navigate(['cidade/' + operacao, id?.toString()]) : this._router.navigate(['cidade/' + operacao])
    }

    passarIdCidadeSelecionada(id: any)
    {

        if (!id || this.desativarOperacoes) return;
        this._cidadeService.definirIdCidadeSelecionada(String(id))
    }

    ngOnInit()
    {
        this.verificarOperacoes();
    }

}
