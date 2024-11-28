import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psychologist } from '../../domain/model/psychologist-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsychologistCreateService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  create(psychologist: Psychologist) {
    return firstValueFrom(
      this.http.post<Psychologist>('http://localhost:8080/api/psicologo', {
        Body: psychologist,
        Headers: this.getHeaders()
      })
    ).catch(error => {
      throw error;
    });
  }
}
