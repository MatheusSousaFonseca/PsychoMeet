import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityDeleteService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  delete(availability: Availability) {
    return firstValueFrom(
      this.http.delete('http://localhost:8080/api/disponibilidade/datahora', { body: availability, headers: this.getHeaders() })
    );
  }
}
