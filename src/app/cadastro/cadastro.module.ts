// src/app/cadastro/cadastro.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // **CERTIFIQUE-SE QUE ReactiveFormsModule ESTÁ AQUI**

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule // <-- ESTE MÓDULO É CRUCIAL PARA FORMULÁRIOS REATIVOS
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}