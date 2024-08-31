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
    return await firstValueFrom(this.http.put(`http://localhost:3000/user/${user.id}`, user));
  }
}
