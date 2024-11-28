import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  
  async updatePassword(passwordData: { email: string; oldPassword: string; newPassword: string }) {
    const url = 'http://localhost:8080/api/pessoa/update-password';
    return await firstValueFrom(this.http.put(url,{body: {
      id: passwordData.email,
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    }, Headers: this.getHeaders()}));
  }
}
