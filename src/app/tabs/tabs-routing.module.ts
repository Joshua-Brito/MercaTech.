import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'detalhes', // Este é o caminho para a aba "Produtos"
        loadChildren: () => import('../detalhes/detalhes.module').then(m => m.DetalhesPageModule)
      },
      {
        path: 'cadastro', // Este é o caminho para a aba "Cadastro"
        loadChildren: () => import('../cadastro/cadastro.module').then(m => m.CadastroPageModule)
      },
      // Rota para edição de produto (seja dentro de 'tabs' ou raiz)
      {
        path: 'cadastro/:id', // Adicione esta rota para permitir a edição
        loadChildren: () => import('../cadastro/cadastro.module').then(m => m.CadastroPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}