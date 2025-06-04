import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  standalone:false
  
})
export class CarrinhoPage {
  carrinho: Product[] = [];
  total = 0;

  constructor(private navCtrl: NavController) {
    this.loadCarrinho();
  }

  loadCarrinho() {
    const data = localStorage.getItem('carrinho');
    this.carrinho = data ? JSON.parse(data) : [];
    this.total = this.carrinho.reduce((sum, item) => sum + Number(item.price), 0);
  }

  remover(item: Product) {
    this.carrinho = this.carrinho.filter(p => p.id !== item.id);
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    this.loadCarrinho();
  }

  finalizarCompra() {
    alert('Compra finalizada! Obrigado por comprar na MercaTech.');
    localStorage.removeItem('carrinho');
    this.loadCarrinho();
    this.navCtrl.navigateRoot('/tabs/home');
  }
}