import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Availability } from '../../domain/model/disponibilidade-psicologo-model';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityReadService {

  constructor(private http: HttpClient) { }

  findByPsicologo(id: number){
    let url = `http://localhost:8081/api/disponibilidade/psicologo/${id}`;

    return firstValueFrom(this.http.get<Availability[]>(url));
  }
}
