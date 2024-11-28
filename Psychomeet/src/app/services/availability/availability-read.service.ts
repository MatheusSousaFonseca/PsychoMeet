import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityReadService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  findByPsicologo(id: number){
    let url = `http://localhost:8080/api/disponibilidade/psicologo/${id}`;

    return firstValueFrom(this.http.get<Availability[]>(url, {headers: this.getHeaders()}));
  }

}
