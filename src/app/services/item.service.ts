// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _products = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this._products.asObservable();

  constructor() {
    // REMOVIDO: A chamada a loadInitialItems() para que a lista comece vazia
    // this.loadInitialItems();
  }

  // REMOVIDO: O método loadInitialItems() completo
  /*
  private loadInitialItems() {
    const initialItems: Product[] = [
      { id: '1', title: 'Camiseta Basic', description: 'Camiseta de algodão básica, diversas cores.', price: 47.67, category: 'Camisetas', image: 'https://via.placeholder.com/200x200?text=Camiseta+Basica' },
      { id: '2', title: 'Calça Big Ballon Moletom', description: 'Calça de moletom oversized para conforto e estilo.', price: 133.97, category: 'Calças', image: 'https://via.placeholder.com/200x200?text=Calca+Moletom' },
      { id: '3', title: 'Calça Basic Cargo', description: 'Calça cargo com bolsos laterais, versátil e prática.', price: 90.22, category: 'Calças', image: 'https://via.placeholder.com/200x200?text=Calca+Cargo' },
      { id: '4', title: 'Blusa Moletom Canguru', description: 'Blusa de moletom com capuz e bolso canguru.', price: 113.97, category: 'Blusas', image: 'https://via.placeholder.com/200x200?text=Moletom+Canguru' },
    ];
    this._products.next(initialItems);
  }
  */

  // Método para obter todos os produtos
  getItems(): Observable<Product[]> {
    return this.products$;
  }

  // Método para adicionar um novo produto
  addItem(product: Product) {
    const currentProducts = this._products.getValue();
    product.id = this.generateUniqueId(); // Gera um ID único para o novo produto
    this._products.next([...currentProducts, product]);
    console.log('Produto adicionado:', product);
  }

  // Método para deletar um produto
  deleteItem(id: string) {
    const currentProducts = this._products.getValue();
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    this._products.next(updatedProducts);
    console.log(`Produto com ID ${id} excluído.`);
  }

  // Método para obter um produto por ID (útil para edição)
  getItemById(id: string): Product | undefined {
    const currentProducts = this._products.getValue();
    return currentProducts.find(p => p.id === id);
  }

  // Método para atualizar um produto existente
  updateItem(updatedProduct: Product) {
    const currentProducts = this._products.getValue();
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index > -1) {
      currentProducts[index] = updatedProduct;
      this._products.next([...currentProducts]); // Notifica os subscribers da mudança
      console.log('Produto atualizado:', updatedProduct);
    } else {
      console.warn(`Produto com ID ${updatedProduct.id} não encontrado para atualização.`);
    }
  }

  // Função auxiliar para gerar IDs únicos (pode ser melhorado com UUIDs reais se necessário)
  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}