import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T extends { id?: number }>
{

    constructor(protected _http: HttpClient, protected URL: string) { }

    obterRegistroPorNome(nome: string)
    {
        if (nome.match(/^\W|^[0-9]/g)) return;
        let pesquisa = nome.toLowerCase();
        return this._http.get<T[]>(`${this.URL}?q=${pesquisa}`).pipe(tap(console.log), take(1))
    }

    obterRegistroPorId(id: number)
    {
        if (!id) return;
        return this._http.get<T>(`${this.URL}/${id}`).pipe(take(1))
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

