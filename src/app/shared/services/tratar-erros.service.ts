import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../usuario/services/usuario.service';
import { AlertModalService } from './alert-modal.service';

@Injectable({
    providedIn: 'root'
})
export class TratarErrosService
{

    constructor(private _alertModalService: AlertModalService, private _router: Router, private _usuarioService: UsuarioService) { }

    tratarErros(error: HttpErrorResponse)
    {
        switch (error.status)
        {
            case 0: this._alertModalService.mostrarAlertarDanger('Erro inesperado, contate o suporte');
                break;
            case 400: this._alertModalService.mostrarAlertarDanger('Erro da validação');
                break;
            case 401: this._usuarioService.deslogar();
                break;
            case 403: this._alertModalService.mostrarAlertarDanger('Erro da validação');
                break;
            case 404: null
                break;
            case 500: this._alertModalService.mostrarAlertarDanger('Erro inesperado, contate o suporte');
                break;
            default: this._alertModalService.mostrarAlertarDanger('Erro inesperado, contate o suporte');
                break;
        }
    }
}