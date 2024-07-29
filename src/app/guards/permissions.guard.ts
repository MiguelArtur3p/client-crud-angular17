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

    return inject(UsuarioService).verificarPermissoesUsuario(rota!, operacao!) ? true : confirm('Você não tem permissão para acessar essa pagina') ? false : false
};
