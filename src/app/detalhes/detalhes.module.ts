import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalhesPageRoutingModule } from './detalhes-routing.module';
import { DetalhesPage } from './detalhes.page';

// Importe o SharedModule aqui
import { SharedModule } from '../shared.module'; // Verifique o caminho!

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesPageRoutingModule,
    // Remova AppModule daqui!
    SharedModule // <<--- IMPORTE O SharedModule aqui!
  ],
  declarations: [DetalhesPage]
})
export class DetalhesPageModule {}