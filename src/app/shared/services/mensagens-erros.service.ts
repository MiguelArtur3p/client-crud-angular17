import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MensagensErrosService
{
    mensagemDeErro!: string[] | undefined;

    constructor() { }
}
