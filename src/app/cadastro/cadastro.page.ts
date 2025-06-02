import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
// O caminho para ItemService aqui é: saia de 'cadastro' (..) e entre em 'services'
import { ItemService } from '../services/item.service'; // <<--- CAMINHO CORRETO AQUI
// O caminho para Product aqui é: saia de 'cadastro' (..) e entre em 'interfaces'
import { Product } from '../interfaces/product'; // <<--- CAMINHO CORRETO AQUI

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private itemService: ItemService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      image: ['https://via.placeholder.com/150']
    });
  }

  ngOnInit() {}

  async enviar() {
    if (this.form.valid) {
      const novoItem: Product = this.form.value;
      this.itemService.addItem(novoItem);

      const toast = await this.toastController.create({
        message: 'Item cadastrado com sucesso e adicionado à lista em memória!',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      toast.present();
      console.log('Item cadastrado:', novoItem);
      this.form.reset({ image: 'https://via.placeholder.com/150' });
    } else {
      const toast = await this.toastController.create({
        message: 'Preencha todos os campos corretamente!',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      toast.present();
    }
  }
}