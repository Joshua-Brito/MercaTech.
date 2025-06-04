import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from '../interfaces/product';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  featuredProducts: Product[] = [];
  paginaAtual = 1; // <-- Adicione esta linha

  constructor(
    private navController: NavController,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(allProducts => {
      this.featuredProducts = allProducts.filter(p => p.isFeatured === true);
    });
  }

  goToDetalhes() {
    this.navController.navigateForward('/tabs/detalhes');
  }
}