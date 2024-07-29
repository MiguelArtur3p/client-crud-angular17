import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RotasService
{

    keyRotaRedirecionar = 'redirecionarRota';
    constructor(private _router: Router, private _route: ActivatedRoute) { }

    redirecionarParaLogin(rota: string, id?: string)
    {
        if (id)
            localStorage.setItem(this.keyRotaRedirecionar, JSON.stringify(rota + '/' + id))
        else
            localStorage.setItem(this.keyRotaRedirecionar, JSON.stringify(rota))

        return this._router.navigate(['/login',])
    }

    removerRotaLocalStorage()
    {
        localStorage.removeItem(this.keyRotaRedirecionar)
    }

    redirecionarAposLogin()
    {
        let rota = JSON.parse(localStorage.getItem(this.keyRotaRedirecionar)!) || '/home'
        this.removerRotaLocalStorage()
        this._router.navigate([rota]);
    }

    get obterParametrosRotaPaginaAtual()
    {
        let rota = this._route.snapshot.url[0].path;
        let operacao = this._route.snapshot.url[1].path;
        let id = this._route.snapshot.params['id'];
        return { rota, operacao, id }
    }
}
