import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { Cliente } from '../models/Cliente';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { ClienteService } from '../services/cliente.service';

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


    constructor(private _clienteService: ClienteService, private _tratarErrosService: TratarErrosService) { }

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
