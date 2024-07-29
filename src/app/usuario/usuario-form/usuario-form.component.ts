import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidarInputsService } from '../../shared/services/validar-inputs.service';

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent
{
    usuarioCadastroForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, public _validarInputService: ValidarInputsService)
    {
        this.usuarioCadastroForm = _formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            empresaId: ['', [Validators.required]],
            permissoes: ['', [Validators.required]]
        })
    }

    validar()
    {
        if (this.usuarioCadastroForm.invalid)
        {
            this._validarInputService.verificarValidacoesForm(this.usuarioCadastroForm)
            return false
        }
        else
            return true;
    }

    salvar()
    {
        if (!this.validar()) return;
    }

}
