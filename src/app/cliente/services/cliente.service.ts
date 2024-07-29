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

    enviarArquivo(arquivos: Set<File>)
    {
        const formData = new FormData();
        arquivos.forEach(file => formData.append('file', file, file.name))
        return this._http.post('https://httpbin.org/post', formData, {
            observe: 'events',
            reportProgress: true
        })
    }
    // obterClientePorNome(nome: string) 
    // {
    //     if (nome.match(/^\W|^[0-9]/g)) return;
    //     let pesquisa = nome.toLowerCase();
    //     return this._http.get<Cliente[]>(`${URL}?q=${pesquisa}`).pipe(take(1))
    // }

    // obterClientePorId(id: number) 
    // {
    //     if (!id) return;
    //     return this._http.get<Cliente>(`${URL}/${id}`).pipe(take(1))
    // }

    // private adicionar(cliente: Cliente) 
    // {
    //     return this._http.post(URL, cliente).pipe(take(1))
    // }

    // private editar(cliente: Cliente) 
    // {
    //     return this._http.put(`${URL}/${cliente.id}`, cliente)
    // }

    // salvar(cliente: Cliente)
    // {
    //     if (!cliente) return;
    //     if (cliente.id)
    //     {
    //         return this.editar(cliente);
    //     } else
    //     {
    //         return this.adicionar(cliente);
    //     }
    // }

    // remover(id: number) 
    // {
    //     if (!id) return;
    //     return this._http.delete(`${URL}/${id}`).pipe(take(1))
    // }

}
