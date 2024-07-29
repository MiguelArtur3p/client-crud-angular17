import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

import { Cidade } from '../models/Cidade';
import { CrudService } from '../../shared/services/CRUD-service';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class CidadeService extends CrudService<Cidade>
{
    idCidadeSelecionadaEmitter = new EventEmitter<string>();
    rotaId: string | undefined;
    operacao: string | undefined;


    constructor(protected override _http: HttpClient)
    {
        super(_http, `${environment.API}cidades`)
    }


    verificarCidade(id: string)
    {
        return this._http.get(`${URL}/${id}`).pipe(map((cidade: any) => cidade ? cidade : null))
    }

    definirIdCidadeSelecionada(id: string) 
    {
        this.idCidadeSelecionadaEmitter.emit(id)
    }

    definirParametrosRotas(operacao: string, id?: string)
    {
        this.rotaId = id;
        this.operacao = operacao
    }
    // obterCidadePorNome(nomeCidade: string) 
    // {
    //     if (nomeCidade.match(/^\W|^[0-9]/g)) return;
    //     let pesquisa = nomeCidade.toLowerCase();
    //     return this._http.get<Cidade[]>(`${URL}?q=${pesquisa}`).pipe(take(1));
    // }

    // obterCidadePorId(id: string) 
    // {
    //     if (!id) return;
    //     return this._http.get<Cidade>(`${URL}/${id}`).pipe(take(1));
    // }

    // private adicionar(cidade: Cidade) 
    // {
    //     return this._http.post(URL, cidade).pipe(take(1));
    // }

    // private editar(cidade: Cidade) 
    // {
    //     return this._http.put(`${URL}/${cidade.id}`, cidade).pipe(take(1));
    // }

    // salvar(cidade: Cidade)
    // {
    //     if (!cidade) return;
    //     if (cidade.id)
    //     {
    //         return this.editar(cidade);
    //     }
    //     else
    //     {
    //         return this.adicionar(cidade);
    //     }

    // }

    // remover(id: string) 
    // {
    //     if (!id) return;
    //     return this._http.delete(`${URL}/${id}`).pipe(take(1))
    // }


}
