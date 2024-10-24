import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor(private http: HttpClient) { }

  findById(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`http://localhost:8080/api/pessoa/${id}`));
  }

  findByName(nome: string): Promise<User> {
    return firstValueFrom(this.http.get<User>(`http://localhost:3000/user?nome=${nome}`));
  }

  findAll(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>('http://localhost:8080/api/pessoa'));
  }

  findByEmail(email: String): Promise<User> {
    return firstValueFrom(this.http.get<User>(`http://localhost:8080/api/pessoa/email/${email}`))
  }
}
