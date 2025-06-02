// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
// O caminho para Product aqui é: saia de 'services' (..) e entre em 'interfaces'
import { Product } from '../interfaces/product'; // <<--- CAMINHO CORRETO AQUI

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Product[] = [];

  constructor() {
    // Itens de exemplo
    this.addItem({
      id: '1',
      title: 'Camiseta Basic',
      description: 'Camiseta de algodão básica, diversas cores.',
      price: 47.67,
      category: 'Camisetas',
      image: 'https://via.placeholder.com/200x200?text=Camiseta+Basica'
    });
    this.addItem({
      id: '2',
      title: 'Calça Big Ballon Moletom',
      description: 'Calça de moletom confortável e estilosa.',
      price: 132.97,
      category: 'Calças',
      image: 'https://via.placeholder.com/200x200?text=Calca+Moletom'
    });
    this.addItem({
      id: '3',
      title: 'Calça Basic Cargo',
      description: 'Calça cargo com bolsos laterais, ideal para o dia a dia.',
      price: 90.22,
      category: 'Calças',
      image: 'https://via.placeholder.com/200x200?text=Calca+Cargo'
    });
    this.addItem({
      id: '4',
      title: 'Blusa Moletom Canguru',
      description: 'Blusa de moletom com capuz e bolso canguru.',
      price: 113.97,
      category: 'Moletons',
      image: 'https://via.placeholder.com/200x200?text=Blusa+Moletom'
    });
  }

  addItem(item: Product) {
    if (!item.id) {
      item.id = Date.now().toString();
    }
    this.items.push(item);
    console.log('Item adicionado em memória:', item);
    console.log('Lista atualizada:', this.items);
  }

  getItems(): Product[] {
    return [...this.items];
  }
}