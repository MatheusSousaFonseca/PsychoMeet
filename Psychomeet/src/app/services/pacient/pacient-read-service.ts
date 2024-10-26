import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user-model';
import { firstValueFrom } from 'rxjs';
import { Paciente } from '../../domain/model/paciente-model';

@Injectable({
  providedIn: 'root'
})
export class PacienteReadService {

  constructor(private http: HttpClient) { }

  findByPessoaId(pessoaId: number): Promise<Paciente> {
    return firstValueFrom(this.http.get<Paciente>(`http://localhost:8080/api/paciente/pessoa/${pessoaId}`));
  }


}
