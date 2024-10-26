import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psychologist } from '../../domain/model/psychologist-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsychologistReadService {
  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Psychologist> {
    return firstValueFrom(this.http.get<Psychologist>(`http://localhost:8080/api/psicologo/${id}`));
  }

  findByName(nome: string): Promise<Psychologist[]> {
    return firstValueFrom(this.http.get<Psychologist[]>(`http://localhost:3000/psychologist?nome=${nome}`));
  }

  // Update the findAll method to accept name and especialidade parameters
  findAll(name: string, especialidade: string): Promise<Psychologist[]> {
    return firstValueFrom(this.http.get<Psychologist[]>(`http://localhost:8080/api/psicologo?name=${name}&especialidade=${especialidade}`));
  }

  findByEmail(email: string): Promise<Psychologist> {
    return firstValueFrom(this.http.get<Psychologist>(`http://localhost:8080/api/psicologo/email/${email}`));
  }
}
