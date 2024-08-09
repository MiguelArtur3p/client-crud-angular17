import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from '../models/Cliente';
import { CrudService } from '../../shared/services/CRUD-service';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class ClienteService extends CrudService<Cliente>
{
    modalAbertaEmitter = new EventEmitter<boolean>();
    constructor(protected override _http: HttpClient)
    {
        super(_http, `${environment.API}clientes`)
    }

    protected override ordenarRegistro(cliente: Cliente[], pesquisa: string): Cliente[]
    {

        return cliente.filter(cliente => cliente.nome.includes(pesquisa)).sort()
    }

    enviarArquivo(arquivos: Set<File>)
    {
        const formData = new FormData();
        arquivos.forEach(file => formData.append('file', file, file.name))
        return this._http.post('https://httpbin.org/post', formData, {
            observe: 'events',
            reportProgress: true
        })
    }

}
