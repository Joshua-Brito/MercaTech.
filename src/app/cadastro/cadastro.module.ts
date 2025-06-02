import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroPageRoutingModule } from './cadastro-routing.module';
import { CadastroPage } from './cadastro.page';

// Importe o SharedModule aqui
import { SharedModule } from '../shared.module'; // Verifique o caminho!

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    // Remova AppModule daqui, se tiver sido adicionado!
    SharedModule // <<--- IMPORTE O SharedModule aqui!
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}