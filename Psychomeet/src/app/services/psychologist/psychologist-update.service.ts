import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Psychologist } from '../../domain/model/psychologist-model';

@Injectable({
  providedIn: 'root'
})
export class PsychologistUpdateService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  async update(psychologist: Psychologist, id: Number | undefined) {
    console.log(`atualizando o psicologo...`);
    psychologist.dataNascimento = new Date("11/10/2009")
    console.log(psychologist);

    return await firstValueFrom(this.http.put(`http://localhost:8080/api/psicologo/${id}`,  {body: psychologist, Headers: this.getHeaders()}));
  }
}
