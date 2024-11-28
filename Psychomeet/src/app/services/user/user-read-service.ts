import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  findById(id: number): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`http://localhost:8080/api/pessoa/${id}`, {
        headers: this.getHeaders()
      })
    );
  }

  findByName(nome: string): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`http://localhost:3000/user?nome=${nome}`, {
        headers: this.getHeaders()
      })
    );
  }

  findAll(): Promise<User[]> {
    return firstValueFrom(
      this.http.get<User[]>('http://localhost:8080/api/pessoa', {
        headers: this.getHeaders()
      })
    );
  }

  findByEmail(email: String): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(`http://localhost:8080/api/pessoa/email/${email}`, {
        headers: this.getHeaders()
      })
    );
  }
}
