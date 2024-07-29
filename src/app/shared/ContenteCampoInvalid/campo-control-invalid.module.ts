import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlInvalidComponent } from './campo-control-invalid.component';



@NgModule({
  declarations: [CampoControlInvalidComponent],
  imports: [
    CommonModule
  ],
  exports:[CampoControlInvalidComponent]
})
export class CampoControlInvalidModule { }
