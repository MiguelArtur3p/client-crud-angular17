import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Cliente } from "../models/Cliente";
import { inject } from "@angular/core";
import { ClienteService } from "./cliente.service";
import { Observable } from "rxjs";

export const clientResolver: ResolveFn<Cliente> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> =>
{
    return inject(ClienteService).obterRegistroPorId(Number(route.paramMap.get('id')))!;
}