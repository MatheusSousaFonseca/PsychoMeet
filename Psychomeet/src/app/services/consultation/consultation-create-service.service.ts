import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../../domain/model/consultation-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationCreateServiceService {

  constructor(private http: HttpClient) { }

  create(consultation:Consultation){
    return firstValueFrom(this.http.post<Consultation>('http://localhost:3000/consultation', consultation));
  }
}
