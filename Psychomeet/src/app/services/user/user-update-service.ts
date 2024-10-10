import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient) {
  }

  async update(user: User) {
    console.log(`atualizando usuário...`);
    console.log(user);
    return await firstValueFrom(this.http.put(`http://localhost:8081/api/pessoa/${user.id}`, {
      "telefone": user.telefone,
      "nome": user.nome,
      "senha": user.senha,
      "dataNascimento": "1990-05-15",
      "cpf": user.cpf,
      "email": user.email
  }));
  }
}
