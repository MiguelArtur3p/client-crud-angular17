import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';

import { UsuarioLoginRequest } from '../models/usuario-login-request';
import { UsuarioLoginResponse } from '../models/usuario-login-response';
import { ModalService } from '../../shared/services/modal.service';
import { RotasService } from '../../shared/services/rotas.service';
import { AlertModalService } from '../../shared/services/alert-modal.service';
import { environment } from '../../environment/environment';
import { ConfirmacaoModalComponent } from '../../shared/components/confirmacao-modal/confirmacao-modal.component';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService 
{
    keyLogin: string = "UsuarioLogado";
    constructor(private _router: Router, private _http: HttpClient, private _modalService: ModalService, private _rotaService: RotasService,
        private _rotasService: RotasService, private alertModalService: AlertModalService) { }

    obterUsuario(usuario: UsuarioLoginRequest) 
    {
        return this._http.get<UsuarioLoginResponse[]>(`${environment.API}usuario?q=${usuario.email}`).pipe(tap(console.log), take(1))
    }


    autenticarUsuario(usuarioResponse: UsuarioLoginResponse[], usuarioRequest: UsuarioLoginRequest)
    {
        if (usuarioResponse.length === 0)
        {
            this.alertModalService.mostrarAlertarDanger('Usuário não encontrado!');
            return
        }
        if ((usuarioResponse[0].email === usuarioRequest.email) && (usuarioResponse[0].senha === usuarioRequest.password))
        {
            this.salvarUsuarioLogadoNoLocalStorage(usuarioResponse[0]);
            this._rotasService.redirecionarAposLogin();
        }
        else
            this.alertModalService.mostrarAlertarDanger('Usuário ou senha incorretos!')
    }


    deslogar()
    {
        if (!this.verificarUsuarioLogado())
            this._router.navigate(['/login'])
        else
        {
            localStorage.removeItem(this.keyLogin);
            this._router.navigate(['/login'])
        }

    }

    salvarUsuarioLogadoNoLocalStorage(usuarioLoginResponse: UsuarioLoginResponse)
    {
        if (!usuarioLoginResponse) return
        localStorage.setItem(this.keyLogin, JSON.stringify(usuarioLoginResponse));
    }

    verificarUsuarioLogado(): boolean
    {
        return localStorage.getItem(this.keyLogin) ? true : false;
    }

    obterUsuarioLocalStorage()
    {
        return JSON.parse(localStorage.getItem(this.keyLogin)!) || false;
    }

    verificarPermissaoUsuario(rota: string, operacao: string): boolean
    {
        let usuarioLogado: UsuarioLoginResponse = this.obterUsuarioLocalStorage();
        operacao = this.converterOperacaoParaPermissao(operacao);

        let claim = usuarioLogado.claim.find(claim => claim.type.toLowerCase() === rota)
        if (!claim) return false;
        return claim.value.toLowerCase().includes(operacao);
    }

    verificarSeUsuarioPossuiAlgumaPermissao(rota: string)
    {
        let usuarioLogado: UsuarioLoginResponse = this.obterUsuarioLocalStorage();
        if (!usuarioLogado) return false
        let claim = usuarioLogado.claim.find(claim => claim.type.toLowerCase() === rota)
        if (!claim) return false;
        return claim.value === '' ? false : true;
    }

    verificarTrocarUsuario(rota: string, operacao: string, id?: string)
    {
        this._modalService.abrirModalConfirmacao(ConfirmacaoModalComponent, 'Confirmação', 'Você não tem permissão para acessar essa pagina, deseja trocar de Usuário?', { class: 'modal-sm' }).pipe(take(1)).subscribe({
            next: trocarUsuario =>
            {
                if (!trocarUsuario)
                    this._modalService.fecharModal();
                else
                    this._rotaService.redirecionarParaLogin(`/${rota}/${operacao}`, id)
            }
        })
    }

    converterOperacaoParaPermissao(operacao?: string)
    {
        if (!operacao)
            return 'consultar'
        else if (operacao === 'editar')
            return 'atualizar'
        return operacao
    }
}
