import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  async update(user: User) {
    console.log(`atualizando usuário...`);
    console.log(user);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/pessoa/${user.id}`, {

      body: {
      "telefone": user.telefone,
      "nome": user.nome,
      "senha": user.senha,
      "dataNascimento": "1990-05-15",
      "cpf": user.cpf,
      "email": user.email
  }, Headers: this.getHeaders()}));
  }
}
