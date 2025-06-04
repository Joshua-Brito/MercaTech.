import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Product } from '../interfaces/product';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {
  categoriaSelecionada: string = 'Todos';
  produtos: Product[] = [];
  produtosFiltrados: Product[] = [];
  categorias: string[] = [];

  constructor(
    private itemService: ItemService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((data: Product[]) => {
      this.produtos = data;
      this.categorias = Array.from(new Set(data.map(p => p.category)));
      this.filtrarPorCategoria();
    });
  }

  filtrarPorCategoria() {
    if (this.categoriaSelecionada === 'Todos') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtosFiltrados = this.produtos.filter(
        p => p.category === this.categoriaSelecionada
      );
    }
  }

  getProductImage(produto: Product): string {
    const images: {[key: string]: string} = {
      'Monitores': 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      'Mouses': 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
      'Teclados': 'https://cdn-icons-png.flaticon.com/512/1041/1041918.png',
      'Áudio': 'https://cdn-icons-png.flaticon.com/512/727/727240.png',
      'Placas de Vídeo': 'https://cdn-icons-png.flaticon.com/512/1041/1041917.png',
      'Cadeiras': 'https://cdn-icons-png.flaticon.com/512/1041/1041920.png',
      'Mousepads': 'https://cdn-icons-png.flaticon.com/512/1041/1041921.png',
      'Memórias': 'https://cdn-icons-png.flaticon.com/512/1041/1041919.png'
    };
    return images[produto.category] || 'https://via.placeholder.com/400x300?text=Sem+Imagem';
  }

  async adicionarCarrinho(produto: Product) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    if (!carrinho.find((p: Product) => p.id === produto.id)) {
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      const toast = await this.toastCtrl.create({
        message: 'Produto adicionado ao carrinho!',
        duration: 1500,
        color: 'success',
        position: 'top',
        icon: 'cart'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Este produto já está no carrinho.',
        duration: 1500,
        color: 'warning',
        position: 'top',
        icon: 'alert'
      });
      toast.present();
    }
  }
}