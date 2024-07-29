import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

import { Cidade } from '../models/Cidade';
import { CidadeService } from './cidade.service';

@Injectable({
    providedIn: 'root'
})
export class CidadeValidatorService implements AsyncValidator
{

    constructor(private _cidadeService: CidadeService) { }

    validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null>
    {
        return this._cidadeService.verificarCidade(control.value).pipe(map((cidade: Cidade) => (cidade ? null : { cidadeNaoEncontrada: true })), catchError(() => of({ cidadeNaoEncontrada: true })),);
    }
}


