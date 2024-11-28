import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../../domain/model/consultation-model';
import { firstValueFrom } from 'rxjs';
import { Agendamento } from '../../domain/model/agendamento-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationCreateService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  

  create(agendamento: Agendamento){
    return firstValueFrom(this.http.post<number>('http://localhost:8080/api/agendamento', agendamento, {headers: this.getHeaders()}));
  }
}
