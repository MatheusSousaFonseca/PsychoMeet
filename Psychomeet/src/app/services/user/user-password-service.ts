import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  constructor(private http: HttpClient) { }

  // Função que chama a API para atualizar a senha
  async updatePassword(passwordData: { email: string; oldPassword: string; newPassword: string }) {
    const url = 'http://localhost:8080/api/pessoa/update-password';
    return await firstValueFrom(this.http.put(url, {
      id: passwordData.email, // Considerando que o email é o identificador, mas ajuste se necessário
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    }));
  }
}
