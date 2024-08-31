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
    return await firstValueFrom(this.http.put(`http://localhost:3000/product/${consultation.id}`, consultation));
  }
}
