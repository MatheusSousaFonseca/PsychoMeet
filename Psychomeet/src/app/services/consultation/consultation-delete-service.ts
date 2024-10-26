import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationDeleteService {

  constructor(private http: HttpClient) { }

  delete(id: number){
    return firstValueFrom(this.http.delete(`http://localhost:8080/api/agendamento/${id}`));
  }

  cancelarConsulta(id: number){
    return firstValueFrom(this.http.delete(`http://localhost:8080/api/consulta/${id}`));
  }
}
