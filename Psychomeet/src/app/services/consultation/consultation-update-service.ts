import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationUpdateService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  async update(consultation: Consultation) {
    console.log(`atualizando a consulta...`);
    console.log(consultation);
    return await firstValueFrom(
      this.http.put(
        `http://localhost:8080/consultation/${consultation.consultaId}`,
        consultation, 
        { headers: this.getHeaders() }
      )
    );
  }

  async confirmar(agendamentoId: number){
    console.log(`Confirmando o agendamento...`);
    console.log(agendamentoId);
    return await firstValueFrom(
      this.http.put(
        `http://localhost:8080/api/agendamento/confirmar/${agendamentoId}`,
        {}, 
        { headers: this.getHeaders() } 
      )
    );
  }

}
