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
    return firstValueFrom(this.http.get<Psychologist>(`http://localhost:3000/psychologist/${id}`));
  }

  findByName(nome: string): Promise<Psychologist[]> {
    return firstValueFrom(this.http.get<Psychologist[]>(`http://localhost:3000/psychologist?nome=${nome}`));
  }

  findAll(): Promise<Psychologist[]> {
    return firstValueFrom(this.http.get<Psychologist[]>('http://localhost:3000/psychologist'));
  }

  findByEmail(email: String): Promise<Psychologist[]> {
    return firstValueFrom(this.http.get<Psychologist[]>(`http://localhost:3000/psychologist?email=${email}`))
  }
}
