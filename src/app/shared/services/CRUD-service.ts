import { HttpClient } from "@angular/common/http";
import { delay, map, take, tap } from "rxjs";

import { removerAcentos } from "./remover-acentuos";

export class CrudService<T extends { id?: string }>
{
    constructor(protected _http: HttpClient, protected URL: string) { }

    obterRegistroPorNome(nome: string)
    {
        if (nome.match(/^\W|^[0-9]/g)) return;
        let pesquisa = nome.toLowerCase();
        return this._http.get<T[]>(`${this.URL}?q=${pesquisa}`).pipe(tap(console.log))
    }

    obterRegistroPorId(id: number)
    {
        if (!id) return;
        return this._http.get<T>(`${this.URL}/${id}`).pipe(take(1))
    }

    filtrarRegistroPorNome(registro: T[], pesquisa: string): T[]
    {
        let pesquisaSemAcento = removerAcentos(pesquisa);
        return registro.filter((registro: any) => registro.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").startsWith(pesquisaSemAcento)).sort()
    }

    private adicionar(valor: T)
    {
        return this._http.post(this.URL, valor).pipe(take(1))
    }

    private editar(valor: T)
    {
        return this._http.put(`${this.URL}/${valor.id}`, valor).pipe(take(1))
    }

    salvar(valor
        : T)
    {
        if (!valor) return;
        if (valor.id)
            return this.editar(valor);
        else
            return this.adicionar(valor);
    }

    remover(id: number)
    {
        if (!id) return;
        return this._http.delete(`${this.URL}/${id}`).pipe(delay(200), take(1))
    }

}

