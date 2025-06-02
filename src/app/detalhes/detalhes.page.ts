import { Component, OnInit } from '@angular/core';
// O caminho para Product aqui é: saia de 'detalhes' (..) e entre em 'interfaces'
import { Product } from '../interfaces/product'; // <<--- CAMINHO CORRETO AQUI
// O caminho para ItemService aqui é: saia de 'detalhes' (..) e entre em 'services'
import { ItemService } from '../services/item.service'; // <<--- CAMINHO CORRETO AQUI

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false, // <<--- ISSO DEVE CONTINUAR SENDO FALSE
})
export class DetalhesPage implements OnInit {
  produtos: Product[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.loading = true;
    this.error = false;
    try {
      this.produtos = this.itemService.getItems();
      if (this.produtos.length === 0) {
        console.warn('Nenhum item cadastrado ainda. A lista está vazia.');
      }
      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
      console.error('Erro ao carregar produtos do serviço de itens:', err);
    }
  }
}