import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { UsuarioLoginRequest } from '../models/usuario-login-request';
import { ValidarInputsService } from '../../shared/services/validar-inputs.service';
import { TratarErrosService } from '../../shared/services/tratar-erros.service';
import { UsuarioLoginResponse } from '../models/usuario-login-response';
import { RotasService } from '../../shared/services/rotas.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
})
export class LoginFormComponent 
{
    loginForm: FormGroup;
    usuarioLoginRequest: UsuarioLoginRequest | undefined;
    constructor(
        private _loginService: UsuarioService,
        private _formBuilder: FormBuilder,
        public _validarInputsService: ValidarInputsService,
        private _router: Router,
        private _tratarErro: TratarErrosService,
        private _rotasService: RotasService
    ) 
    {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    validar()
    {
        if (this.loginForm.invalid)
        {
            this._validarInputsService.verificarValidacoesForm(this.loginForm)
            return false
        }
        else
            return true;
    }

    criarUsuario() 
    {
        this.usuarioLoginRequest = Object.assign({}, this.loginForm.value);
    }




    login() 
    {
        if (!this.validar()) return;
        this.criarUsuario();
        if (!this.usuarioLoginRequest) return;
        this._loginService.obterUsuario(this.usuarioLoginRequest).subscribe({
            next: usuarioLoginResponse => this._loginService.autenticarUsuario(usuarioLoginResponse, this.usuarioLoginRequest!),
            error: error => this._tratarErro.tratarErros(error),
        })
    }
}
