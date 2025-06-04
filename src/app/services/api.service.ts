import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Necessário para Observables

@Injectable({
  providedIn: 'root' // Indica que o service será um singleton e injetável em qualquer lugar
})
export class ApiService {

  // URL da API que será utilizada (Fake Store API)
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {
    // HttpClient é injetado aqui para fazer as requisições HTTP
  }

  // Método para obter todos os produtos da API
  getProdutos(): Observable<any[]> { // Usamos 'any[]' pois a API retorna um array de objetos
    return this.http.get<any[]>(this.apiUrl);
  }

  // Você pode adicionar outros métodos (POST, PUT, DELETE) aqui, se necessário no futuro
  // Exemplo de um método POST, se você fosse enviar dados de um formulário:
  // postProduto(produto: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, produto);
  // }
}