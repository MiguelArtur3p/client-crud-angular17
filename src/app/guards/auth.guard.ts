import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, } from '@angular/router';
import { inject } from '@angular/core';

import { UsuarioService } from '../usuario/services/usuario.service';
import { RotasService } from '../shared/services/rotas.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>
{
    let usuarioEstaLogado: boolean = inject(UsuarioService).verificarUsuarioLogado();

    if (!usuarioEstaLogado) return inject(Router).createUrlTree(['/login'])
    else
        return true
}
