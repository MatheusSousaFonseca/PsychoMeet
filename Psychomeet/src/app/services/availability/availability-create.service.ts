import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityCreateService {

  constructor(private http: HttpClient) { }

  create(availability : Availability){
    return firstValueFrom(this.http.post<Availability>('http://localhost:3000/availability', availability));
  }
}
