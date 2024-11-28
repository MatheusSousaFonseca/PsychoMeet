import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psychologist } from '../../domain/model/psychologist-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsychologistReadService {

  private baseUrl = 'http://localhost:8080/api/psicologo';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  private buildParams(params: { [key: string]: string | undefined }): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]!);
      }
    });
    return httpParams;
  }

  findById(id: string): Promise<Psychologist> {
    return firstValueFrom(
      this.http.get<Psychologist>(`${this.baseUrl}/${id}`, {
        headers: this.getHeaders()
      })
    );
  }

  findByName(nome: string): Promise<Psychologist[]> {
    return firstValueFrom(
      this.http.get<Psychologist[]>(`http://localhost:3000/psychologist?nome=${nome}`, {
        headers: this.getHeaders()
      })
    );
  }

  
  findAll(name?: string, especialidade?: string): Promise<Psychologist[]> {
    return firstValueFrom(
      this.http.get<Psychologist[]>(this.baseUrl + `?name=${name}&especialidade=${especialidade}`, {
        headers: this.getHeaders()
      })
    );
  }

  findByEmail(email: string): Promise<Psychologist> {
    return firstValueFrom(
      this.http.get<Psychologist>(`${this.baseUrl}/email/${email}`, {
        headers: this.getHeaders()
      })
    );
  }
}
