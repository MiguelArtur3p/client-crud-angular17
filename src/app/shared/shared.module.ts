import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaModalComponent } from './alerta-modal/alerta-modal.component';
import { ConfirmacaoModalComponent } from './confirmacao-modal/confirmacao-modal.component';
import { ToastsErrorComponent } from './toasts-error/toasts-error.component';



@NgModule({
    declarations: [
        AlertaModalComponent,
        ConfirmacaoModalComponent,
        ToastsErrorComponent
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
