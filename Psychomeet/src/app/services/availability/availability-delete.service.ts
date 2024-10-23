import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityDeleteService {

  constructor(private http: HttpClient) { }

  delete(availability: Availability) {
    // Passa o objeto Availability no campo 'body' do segundo argumento (options)
    return firstValueFrom(
      this.http.delete('http://localhost:8080/api/disponibilidade/datahora', { body: availability })
    );
  }
}
