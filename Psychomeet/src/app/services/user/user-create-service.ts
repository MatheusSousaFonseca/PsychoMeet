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
    console.log(user);
    return firstValueFrom(this.http.post<User>('http://localhost:8081/api/pessoa', user));
  }
}
