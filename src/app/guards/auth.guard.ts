import
    {
        ActivatedRouteSnapshot,
        CanActivateFn,
        Router,
        RouterStateSnapshot,
    } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../usuario/services/usuario.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) =>
{
    return inject(UsuarioService).verificarUsuarioLogado()
        ? true
        : inject(Router).createUrlTree(['/login']);
};
