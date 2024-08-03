import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertaModalComponent } from './components/alerta-modal/alerta-modal.component';
import { ToastsErrorComponent } from './components/toasts-error/toasts-error.component';
import { ConfirmacaoModalComponent } from './components/confirmacao-modal/confirmacao-modal.component';
import { BaseFormComponent } from './components/base-form/base-form.component';

@NgModule({
    declarations: [
        AlertaModalComponent,
        ConfirmacaoModalComponent,
        ToastsErrorComponent,
        BaseFormComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertaModalComponent,
        ConfirmacaoModalComponent,
        ToastsErrorComponent
    ]
})
export class SharedModule { }
