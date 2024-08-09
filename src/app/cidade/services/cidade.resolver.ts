import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

import { Cidade } from "../models/Cidade";
import { CidadeService } from "./cidade.service";

export const cidadeResolver: ResolveFn<Cidade> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cidade> =>
{
    return inject(CidadeService).obterRegistroPorId(Number(route.paramMap.get('id')))!;
}