import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class UserCreateService {

constructor(private http: HttpClient) { }

private getHeaders(): HttpHeaders {
const token = localStorage.getItem('token'); // Retrieve the token
    return new HttpHeaders({
Authorization: `Bearer ${token}` // Add the token to the headers
    });
}

create(user: User) {
return firstValueFrom(this.http.post<User>('http://localhost:8080/api/pessoa', user,{headers: this.getHeaders()} ))
      .catch(error => {
throw new Error(error.error ? error.error : 'Erro desconhecido');
});
}
}
