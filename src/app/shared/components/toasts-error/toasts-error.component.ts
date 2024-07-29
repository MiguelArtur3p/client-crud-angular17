import { Component } from '@angular/core';

import { MensagensErrosService } from '../../services/mensagens-erros.service';

@Component({
    selector: 'toasts-error',
    templateUrl: './toasts-error.component.html',
    styleUrl: './toasts-error.component.css'
})
export class ToastsErrorComponent 
{
    constructor(public mensagensDeErros: MensagensErrosService) { }

    fecharToast()
    {
        this.mensagensDeErros.mensagemDeErro = undefined;
    }
}
