// src/app/cadastro/cadastro.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Product } from '../interfaces/product';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone:false,
})
export class CadastroPage implements OnInit {
  productForm!: FormGroup;
  productId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private navController: NavController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm(); // Inicializa o formulário

    this.activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditing = true;
        this.loadProductForEdit(this.productId);
      } else {
        this.isEditing = false;
        this.productForm.reset();
        this.productForm.patchValue({ isFeatured: false }); // Garante valor inicial para o toggle
      }
    });
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  loadProductForEdit(id: string) {
    const product = this.itemService.getItemById(id);
    if (product) {
      this.productForm.patchValue(product);
    } else {
      this.presentToast('Produto não encontrado para edição.', 'danger');
      this.navController.navigateBack('/tabs/detalhes');
    }
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEditing && product.id) {
        this.itemService.updateItem(product);
        await this.presentToast('Produto atualizado com sucesso!', 'success');
      } else {
        this.itemService.addItem(product);
        await this.presentToast('Produto cadastrado com sucesso!', 'success');
      }

      this.productForm.reset();
      this.isEditing = false; // Após cadastrar/atualizar, reseta para modo de novo cadastro
      this.navController.navigateBack('/tabs/detalhes');
    } else {
      await this.presentToast('Por favor, preencha todos os campos obrigatórios e válidos.', 'warning');
      this.productForm.markAllAsTouched();
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}