import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationDeleteService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  delete(id: number){
    return firstValueFrom(this.http.delete(`http://localhost:8080/api/agendamento/${id}`, {headers:this.getHeaders()}));
  }

  cancelarConsulta(id: number){
    return firstValueFrom(this.http.delete(`http://localhost:8080/api/consulta/${id}`, {headers:this.getHeaders()}));
  }
}
