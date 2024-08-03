import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

import { Cidade } from '../models/Cidade';
import { CrudService } from '../../shared/services/CRUD-service';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs';

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
        return this._http.get(`${this.URL}/${id}`).pipe(map((cidade: any) => cidade ? cidade : null))
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

}
