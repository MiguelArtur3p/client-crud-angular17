import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-invalid',
  templateUrl: './campo-control-invalid.component.html',
  styleUrl: './campo-control-invalid.component.css'
})
export class CampoControlInvalidComponent 
{
    @Input('mostrarErro') mostrarErro: boolean | undefined=false;
    @Input('msgErro') msgErro: string="";
}
