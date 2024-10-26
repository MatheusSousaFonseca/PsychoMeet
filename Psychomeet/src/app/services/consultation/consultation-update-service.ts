import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationUpdateService {

  constructor(private http: HttpClient) {
  }

  async update(consultation: Consultation) {
    console.log(`atualizando o produto...`);
    console.log(consultation);
    return await firstValueFrom(this.http.put(`http://localhost:8080/consultation/${consultation.consultaId}`, consultation));
  }

  async confirmar(agendamentoId: number){
    console.log(`Confirmando o agendamento...`);
    console.log(agendamentoId);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/agendamento/confirmar/${agendamentoId}`, {body: ""} ));
  }

}
