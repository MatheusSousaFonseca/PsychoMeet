import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  constructor(private http: HttpClient) { }

  
  async updatePassword(passwordData: { email: string; oldPassword: string; newPassword: string }) {
    const url = 'http://localhost:8081/api/pessoa/update-password';
    return await firstValueFrom(this.http.put(url, {
      id: passwordData.email, 
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    }));
  }
}