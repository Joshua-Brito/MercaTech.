import { Component } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage {
  categorias = [
    'Todos',
    'Microfone',
    'Mouse',
    'Monitor',
    'Mousepad',
    'Teclado',
    'Headset',
    'Gabinete',
    'Kit'
  ];
  categoriaSelecionada = 'Todos';

  produtos = [
    { nome: 'Microfone Condensador', categoria: 'Microfone', descricao: 'Microfone profissional para gravação e streaming.', preco: 299, estrelas: 5, freteGratis: true },
    { nome: 'Mouse Gamer RGB', categoria: 'Mouse', descricao: 'Mouse com iluminação RGB e alta precisão.', preco: 159, estrelas: 4, freteGratis: false },
    { nome: 'Monitor 27" Full HD', categoria: 'Monitor', descricao: 'Monitor IPS com 75Hz e bordas finas.', preco: 1299, estrelas: 5, freteGratis: true },
    { nome: 'Mousepad XL', categoria: 'Mousepad', descricao: 'Mousepad grande para setups gamers.', preco: 79, estrelas: 4, freteGratis: true },
    { nome: 'Teclado Mecânico RGB', categoria: 'Teclado', descricao: 'Teclado com switches azuis e iluminação.', preco: 349, estrelas: 5, freteGratis: true },
    { nome: 'Headset Surround 7.1', categoria: 'Headset', descricao: 'Headset com som surround e microfone removível.', preco: 249, estrelas: 4, freteGratis: false },
    { nome: 'Gabinete Gamer Mid Tower', categoria: 'Gabinete', descricao: 'Gabinete com lateral em vidro temperado.', preco: 499, estrelas: 5, freteGratis: true },
    { nome: 'Kit Upgrade Gamer', categoria: 'Kit', descricao: 'Placa-mãe, processador e memória RAM.', preco: 1899, estrelas: 5, freteGratis: true },
    { nome: 'Microfone USB', categoria: 'Microfone', descricao: 'Microfone plug and play para podcasts.', preco: 199, estrelas: 4, freteGratis: true },
    { nome: 'Mouse Sem Fio', categoria: 'Mouse', descricao: 'Mouse ergonômico com bateria recarregável.', preco: 99, estrelas: 4, freteGratis: false },
    { nome: 'Monitor 24" Curvo', categoria: 'Monitor', descricao: 'Monitor curvo com 144Hz para jogos.', preco: 1199, estrelas: 5, freteGratis: true },
    { nome: 'Mousepad Gamer RGB', categoria: 'Mousepad', descricao: 'Mousepad com iluminação LED personalizável.', preco: 129, estrelas: 5, freteGratis: true },
    { nome: 'Teclado Sem Fio', categoria: 'Teclado', descricao: 'Teclado compacto e silencioso.', preco: 179, estrelas: 4, freteGratis: false },
    { nome: 'Headset Bluetooth', categoria: 'Headset', descricao: 'Headset sem fio com bateria de longa duração.', preco: 299, estrelas: 4, freteGratis: true },
    { nome: 'Gabinete Mini ITX', categoria: 'Gabinete', descricao: 'Gabinete compacto para PCs pequenos.', preco: 399, estrelas: 4, freteGratis: false },
    { nome: 'Kit Peças RGB', categoria: 'Kit', descricao: 'Coolers, fitas LED e acessórios RGB.', preco: 149, estrelas: 5, freteGratis: true },
    { nome: 'Microfone de Lapela', categoria: 'Microfone', descricao: 'Ideal para entrevistas e vídeos.', preco: 59, estrelas: 4, freteGratis: true },
    { nome: 'Mouse Vertical', categoria: 'Mouse', descricao: 'Design ergonômico para conforto prolongado.', preco: 139, estrelas: 4, freteGratis: false },
    { nome: 'Monitor 32" 4K', categoria: 'Monitor', descricao: 'Alta resolução para produtividade e jogos.', preco: 2499, estrelas: 5, freteGratis: true },
    { nome: 'Headset com Cancelamento', categoria: 'Headset', descricao: 'Redução de ruído ativa para imersão total.', preco: 399, estrelas: 5, freteGratis: true }
  ];

  get produtosFiltrados() {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }
}