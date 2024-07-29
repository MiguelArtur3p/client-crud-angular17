import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsuarioService } from './usuario/services/usuario.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy
{
    mostrarMenuLateral = false;
    title = 'Cadastro';
    inscricao!: Subscription;
    constructor(private _loginService: UsuarioService)
    {

    }

    ngOnInit() 
    {
        this.inscricao = this._loginService.mostrarConteudoEmitter.subscribe(
            (mostrar: boolean) => (this.mostrarMenuLateral = mostrar)
        );
    }

    ngOnDestroy()
    {
        this.inscricao.unsubscribe();
    }

}
