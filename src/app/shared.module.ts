import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como ngIf, ngFor
import { IonicModule } from '@ionic/angular'; // Se usar componentes Ionic nos itens compartilhados

// Importe seus Pipes e Diretivas personalizados
import { MaiusculaPipe } from './pipes/maiuscula.pipe';
import { DestaqueDirective } from './directives/destaque.directive';

@NgModule({
  declarations: [
    MaiusculaPipe,
    DestaqueDirective
  ],
  imports: [
    CommonModule,
    IonicModule // Importe se seus Pipes/Diretivas usarem componentes Ionic
  ],
  exports: [ // <<--- MUITO IMPORTANTE: Exporte-os para que outros módulos possam usá-los
    MaiusculaPipe,
    DestaqueDirective,
    CommonModule, // Exporte CommonModule também para conveniência
    IonicModule // Exporte IonicModule também para conveniência
  ]
})
export class SharedModule { }