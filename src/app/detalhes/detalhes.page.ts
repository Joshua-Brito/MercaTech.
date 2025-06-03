// src/app/detalhes/detalhes.page.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ItemService } from '../services/item.service';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone:false,
})
export class DetalhesPage implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private itemService: ItemService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private navController: NavController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.carregarProdutos();
    this.itemService.getItems().subscribe(items => {
      this.products = items;
      this.loading = false;
      console.log('Produtos carregados:', this.products);
      if (this.products.length === 0) {
        console.warn('Nenhum item cadastrado ainda. A lista está vazia.');
      }
    }, (err: any) => {
      console.error('Erro ao carregar produtos do serviço:', err);
      this.error = true;
      this.loading = false;
    });
  }

  carregarProdutos() {
    this.loading = true;
    this.error = false;
  }

  async presentActionSheet(productId: string) {
    const product = this.itemService.getItemById(productId);
    if (!product) {
      this.presentToast('Produto não encontrado para ações.', 'danger');
      return;
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opções do Produto',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            this.editarProduto(productId);
          }
        },
        {
          text: product.isFeatured ? 'Remover do Destaque' : 'Marcar como Destaque',
          icon: product.isFeatured ? 'star-outline' : 'star',
          handler: () => {
            this.toggleDestaque(productId, !product.isFeatured);
          }
        },
        {
          text: 'Excluir',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.confirmarExclusao(productId);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clicado');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async confirmarExclusao(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir este produto?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirProduto(id);
          }
        }
      ]
    });
    await alert.present();
  }

  excluirProduto(id: string) {
    this.itemService.deleteItem(id);
    this.presentToast('Produto excluído com sucesso!', 'success');
  }

  editarProduto(id: string) {
    this.navController.navigateForward(`/tabs/cadastro/${id}`);
  }

  toggleDestaque(id: string, isFeatured: boolean) {
    const product = this.itemService.getItemById(id);
    if (product) {
      const updatedProduct: Product = { ...product, isFeatured: isFeatured };
      this.itemService.updateItem(updatedProduct);
      const message = isFeatured ? 'Produto marcado como destaque!' : 'Produto removido do destaque!';
      this.presentToast(message, 'success');
    } else {
      this.presentToast('Não foi possível atualizar o destaque. Produto não encontrado.', 'danger');
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