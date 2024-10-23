import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  create(user: User) {
    return firstValueFrom(this.http.post<User>('http://localhost:8080/api/pessoa', user))
      .catch(error => {
        throw new Error(error.error ? error.error : 'Erro desconhecido');
      });
  }
}
