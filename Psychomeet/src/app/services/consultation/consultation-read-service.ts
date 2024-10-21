import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationReadService {

  constructor(private http: HttpClient) { }

  findById(id: number): Promise<Consultation> {
    return firstValueFrom(this.http.get<Consultation>(`http://localhost:3000/consultation/${id}`));
  }

  findByName(nome: string): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>(`http://localhost:3000/consultation?nome=${nome}`));
  }

  findAll(): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>('http://localhost:3000/consultation'));
 }

 findByIdPsicologoAccept(id: number): Promise<Consultation[]> {
  let url = `http://localhost:8081/api/consulta/psicologo/${id}?status=Confirmado`;

  return firstValueFrom(this.http.get<Consultation[]>(url));
}

findByIdPsicologoPendente(id: number): Promise<Consultation[]> {
  return firstValueFrom(this.http.get<Consultation[]>(`http://localhost:3000/consultation?idPsicologo=${id}&status=PENDENTE`));
}

findByIdPacientePendente(id: number): Promise<Consultation[]> {
  return firstValueFrom(this.http.get<Consultation[]>(`http://localhost:3000/consultation?idPaciente=${id}&status=PENDENTE`));
}

findByIdPacienteAccept(id: number, status?: string): Promise<Consultation[]> {
  let url = `http://localhost:8081/api/consulta/paciente/${id}`;
  if (status) {
    url += `?status=${status}`; 
  }

  return firstValueFrom(this.http.get<Consultation[]>(url));
}
}
