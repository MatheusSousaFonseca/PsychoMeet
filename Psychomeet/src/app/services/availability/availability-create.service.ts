import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityCreateService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  }

  create(availability: Availability) {
    return firstValueFrom(
      this.http.post<Availability>(
        'http://localhost:8080/api/disponibilidade',
        availability, 
        { headers: this.getHeaders() } 
      )
    );

  }
}
