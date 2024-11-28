import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Consultation } from '../../domain/model/consultation-model';
import { consultationFeedback } from '../../domain/dto/consultation-feedback';

@Injectable({
  providedIn: 'root'
})
export class ConsultationFeedbackService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  async update(feedback: consultationFeedback) {
    console.log(`Enviando o feedback...`);
    console.log(feedback);

    return await firstValueFrom(this.http.put(`http://localhost:8080/api/consulta/feedback`, feedback, {headers: this.getHeaders()}));
  }
}
