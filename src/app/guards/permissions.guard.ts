import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, } from '@angular/router';

import { UsuarioService } from '../usuario/services/usuario.service';
import { RotasService } from '../shared/services/rotas.service';

export const permissionsGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>
{
    let rota = route.data['rota'];
    let operacao = route.data['operacao'];


    return inject(UsuarioService).verificarPermissaoUsuario(rota!, operacao!) ? true : confirm('Usuario sem permissão, deseja trocar de Usuario?') ? inject(RotasService).redirecionarParaLogin(state.url) : false
}
