import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertModalService } from './alert-modal.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class TratarErrosService
{

    constructor(private _alertModalService: AlertModalService, private _router: Router, private _usuarioService: UsuarioService) { }

    tratarErros(error: HttpErrorResponse)
    {
        if (error.status === 0)
        {
            console.log(error)
            this._alertModalService.mostrarAlertarDanger('Erro inesperado, contate o suporte');
        }
        else if (error.status === 400)
        {
            this._alertModalService.mostrarAlertarDanger('Erro da validação');

        }
        else if (error.status === 401)
        {
            this._usuarioService.deslogar();
        }
        else if (error.status === 403)
        {
            this._alertModalService.mostrarAlertarDanger('Erro da validação');
            //caso o usuario nao tenha permissão, pergunta se ele quer trocar de login e redireciona
            // this._router.navigate(['/login'])
        }
        else if (error.status === 404)
        {
            console.log(error)

            this._router.navigate(['/naoencontrada'])
        }
        else if (error.status === 500)
        {
            this._alertModalService.mostrarAlertarDanger('Erro inesperado, contate o suporte');
        }
    }
}
