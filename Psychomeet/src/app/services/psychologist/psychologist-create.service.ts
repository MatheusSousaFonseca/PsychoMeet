import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psychologist } from '../../domain/model/psychologist-model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsychologistCreateService {

  constructor(private http: HttpClient) { }

  create(psychologist:Psychologist){
    return firstValueFrom(this.http.post<Psychologist>('http://localhost:8081/api/psicologo', psychologist));
  }
}
