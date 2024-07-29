import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../usuario/services/usuario.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit 
{
    // mostrarMenuLateral: boolean = false;

    constructor(private _loginService: UsuarioService) { }

    ngOnInit() 
    {
        // this.mostrarMenuLateral = this._loginService.verificarUsuarioLogado()
    }
}
