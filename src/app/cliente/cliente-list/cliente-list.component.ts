import { Component, OnDestroy } from '@angular/core';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/Cliente';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';


@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrl: './cliente-list.component.css',
})
export class ClienteListComponent
{
    clientes?: Cliente[] = [];
    carregandoDados: boolean = false;
    unsubscribe$ = new Subject();


    constructor(private _clienteService: ClienteService, private _alertModalService: AlertModalService, private _tratarErrosService: TratarErrosService) { }

    pesquisar(event: Event)
    {
        this.limparPesquisa();

        let pesquisa = (event.target as HTMLInputElement).value;
        if (!pesquisa) return;
        this.carregandoDados = true;
        this._clienteService.obterRegistroPorNome(pesquisa)?.subscribe({
            next: clientes => { this.carregandoDados = false; this.clientes = clientes },
            error: error => this._tratarErrosService.tratarErros(error),
            complete: () => console.log('upload completo')
        })
    }


    limparPesquisa()
    {
        this.clientes = undefined;
    }

}
