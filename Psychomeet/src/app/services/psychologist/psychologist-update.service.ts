import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Psychologist } from '../../domain/model/psychologist-model';

@Injectable({
  providedIn: 'root'
})
export class PsychologistUpdateService {

  constructor(private http: HttpClient) {
  }

  async update(psychologist: Psychologist) {
    console.log(`atualizando o produto...`);
    console.log(psychologist);
    return await firstValueFrom(this.http.put(`http://localhost:3000/psychologist/${psychologist.id}`, psychologist));
  }
}
