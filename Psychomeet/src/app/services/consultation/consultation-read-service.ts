import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationReadService {

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Consultation> {
    return firstValueFrom(this.http.get<Consultation>(`http://localhost:3000/consultation/${id}`));
  }

  findByName(nome: string): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>(`http://localhost:3000/consultation?nome=${nome}`));
  }

  findAll(): Promise<Consultation[]> {
    return firstValueFrom(this.http.get<Consultation[]>('http://localhost:3000/consultation'));
 }
}
