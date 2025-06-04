import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {
  categorias: string[] = ['Todos'];
  categoriaSelecionada = 'Todos';
  produtos: Product[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((produtos: Product[]) => {
      this.produtos = produtos;
      // Monta as categorias dinamicamente a partir dos produtos
      const cats = produtos.map(p => p.category);
      this.categorias = ['Todos', ...Array.from(new Set(cats))];
    });
  }

  get produtosFiltrados() {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.category === this.categoriaSelecionada);
  }
}