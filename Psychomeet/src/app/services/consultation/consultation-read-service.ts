import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';
import { AgendamentoDisponibilidade } from '../../domain/model/agendamento-disponibilidade-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationReadService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  findById(id: number): Promise<Consultation> {
    return firstValueFrom(this.http.get<Consultation>(`http://localhost:3000/consultation/${id}`, {headers: this.getHeaders()}));
  }

  findByName(nome: string): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>(`http://localhost:3000/consultation?nome=${nome}`, {headers: this.getHeaders()}));
  }

  findAll(): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>('http://localhost:3000/consultation', {headers: this.getHeaders()}));
 }

 findByIdPsicologoAccept(id: number): Promise<Consultation[]> {
  let url = `http://localhost:8080/api/consulta/psicologo/${id}?status=Confirmado`;

  return firstValueFrom(this.http.get<Consultation[]>(url, {headers: this.getHeaders()}));
}

findByIdPsicologoPendente(id: number): Promise<AgendamentoDisponibilidade[]> {
  return firstValueFrom(this.http.get<AgendamentoDisponibilidade[]>(`http://localhost:8080/api/agendamento/psicologo/${id}?status=Pendente`, {headers: this.getHeaders()}));
}

findByIdPacientePendente(id: number): Promise<Consultation[]> {
  let url = `http://localhost:8080/api/consulta/paciente/${id}?status=Pendente`;
  return firstValueFrom(this.http.get<Consultation[]>(url, {headers: this.getHeaders()}));
}

findByIdPacienteAccept(id: number, status?: string): Promise<Consultation[]> {
  let url = `http://localhost:8080/api/consulta/paciente/${id}?status=Confirmado`;
  return firstValueFrom(this.http.get<Consultation[]>(url, {headers: this.getHeaders()}));
}


}
