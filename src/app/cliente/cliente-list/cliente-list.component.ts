import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { Cliente } from '../models/Cliente';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { ClienteService } from '../services/cliente.service';
import { DebounceService } from '../../shared/services/debounce.service';

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

    constructor(private _clienteService: ClienteService, private _tratarErrosService: TratarErrosService, private _debounceService: DebounceService) { }

    pesquisar(event: Event)
    {
        let executarPesquisa = () =>
        {
            this.limparPesquisa();
            let pesquisa = (event.target as HTMLInputElement).value;
            if (!pesquisa) return;
            this.carregandoDados = true;
            this._clienteService.obterRegistroPorNome(pesquisa)?.subscribe({
                next: clientes => this.tratarSucesso(clientes, pesquisa),
                error: error => this._tratarErrosService.tratarErros(error),
            })
        }
        let executarDebounce = this._debounceService.debounce(executarPesquisa, 200);
        executarDebounce();
    }

    tratarSucesso(clientes: Cliente[], pesquisa: string)
    {
        this.carregandoDados = false;
        this.clientes = this._clienteService.filtrarRegistroPorNome(clientes, pesquisa)
    }

    limparPesquisa()
    {
        this.clientes = undefined;
    }

}
