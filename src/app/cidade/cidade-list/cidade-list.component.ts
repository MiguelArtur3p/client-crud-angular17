import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, Subject } from 'rxjs';

import { Cidade } from '../models/Cidade';
import { CidadeService } from '../services/cidade.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { ModalService } from '../../shared/services/modal.service';
import { CidadeFormModalComponent } from '../modals/cidade-form-modal/cidade-form-modal.component';
import { DebounceService } from '../../shared/services/debounce.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'cidade-list',
    templateUrl: './cidade-list.component.html',
    styleUrl: './cidade-list.component.css',
})
export class CidadeListComponent implements OnInit
{
    cidades: Cidade[] = [];
    cidadePaginada: Cidade[] = [];
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
        private _tratarErrosService: TratarErrosService,
        private _debounceService: DebounceService
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

        const executarPesquisa = () =>
        {
            this.limparPesquisa()
            let pesquisa: string = (event.target as HTMLInputElement).value;

            if (!pesquisa) return;

            this.carregandoDados = true;
            this._cidadeService.obterRegistroPorNome(pesquisa)?.subscribe({
                next: cidades => this.tratarSucesso(cidades, pesquisa),
                error: error => this._tratarErrosService.tratarErros(error),
            })
        }
        let executarDebounce = this._debounceService.debounce(executarPesquisa, 200);
        executarDebounce()
    }

    tratarSucesso(cidades: Cidade[], pesquisa: string)
    {
        this.carregandoDados = false;
        this.cidades = this._cidadeService.filtrarRegistroPorNome(cidades, pesquisa)
        this.cidadePaginada = this.cidades!.slice(0, 10);

    }

    limparPesquisa()
    {
        this.cidades = []
        this.cidadePaginada = [];
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

    pageChanged(event: PageChangedEvent): void
    {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.cidadePaginada = this.cidades!.slice(startItem, endItem);
    }

    ngOnInit()
    {
        this.verificarOperacoes();
    }

}
