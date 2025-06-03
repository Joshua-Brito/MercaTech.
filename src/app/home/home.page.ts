// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from '../interfaces/product';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:false,
})
export class HomePage implements OnInit {

  featuredProducts: Product[] = [];

  constructor(
    private navController: NavController,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(allProducts => {
      // Filtra apenas os produtos que têm a propriedade 'isFeatured' como true
      this.featuredProducts = allProducts.filter(p => p.isFeatured === true);
    });
  }

  // Método para navegação para a aba Detalhes (Produtos)
  goToDetalhes() {
    this.navController.navigateForward('/tabs/detalhes');
  }
}