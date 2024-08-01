import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { UsuarioService } from "../usuario/services/usuario.service";

export const anyPermission: CanMatchFn = (route: Route, segments: UrlSegment[]) =>
{
    if (inject(UsuarioService).verificarSeUsuarioPossuiAlgumaPermissao(route.path!))
        return true
    else
        return inject(Router).navigate(['home'])
} 