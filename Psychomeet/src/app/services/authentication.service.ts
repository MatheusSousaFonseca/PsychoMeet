import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { firstValueFrom } from 'rxjs';
import { PsychologistCredential } from '../domain/dto/psychologist-credencial';
import { Psychologist } from '../domain/model/psychologist-model';
import { PsychologistReadService } from './psychologist/psychologist-read.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private psychologistReadService: PsychologistReadService
  ) {

  }

  async authenticateUser(credential: UserCredential) {
    console.log('trying to authenticate...');
    console.log(credential);

    // Agora esperamos um único objeto do tipo UserCredential
    let apiResponse = await firstValueFrom(this.http.get<UserCredential>(`http://localhost:8080/api/pessoa/auth?email=${credential.email}&senha=${credential.senha}`));
    console.log("RESPOSTA DA API");
    console.log(apiResponse);

    if (apiResponse == null) {
      throw new Error('Dados inválidos');
    }

    // Aqui estamos acessando diretamente apiResponse.email, já que não é mais um array
    this.addCredentialsToLocalStorageUser(apiResponse.email);
    return true;
  }


  async authenticatePsychologist(credential: PsychologistCredential) {
    console.log('trying to authenticate...');
    console.log(credential);

    try{
      const apiResponse = await firstValueFrom(this.http.get<Psychologist>(`http://localhost:8080/api/pessoa/auth?email=${credential.email}&senha=${credential.senha}`));
    console.log("RESPOSTA DA API");
    console.log(apiResponse);


    if (!apiResponse) {
      throw new Error('Dados inválidos');
    }

    let psychologist = await this.psychologistReadService.findByEmail(apiResponse.email!);

    console.log(psychologist);

    // Se o psicólogo for nulo ou não tiver CRP, lança erro
    if (!psychologist || !psychologist.crp) {
      throw new Error('Usuário não cadastrado como Psicólogo');
  }

    return true;
    }catch {
      throw new Error('Dados inválidos');
    }

  }

  logoutUser() {
    localStorage.clear();
  }

  isAuthenticatedUser(): boolean {
    let token = localStorage.getItem('token');

    if (token != null) {
      return true;
    }
    return false;
  }

  addCredentialsToLocalStorageUser(email: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', new Date().toLocaleTimeString());
  }




  // async authenticatePsychologist(credential: UserCredential) {
  //   console.log('trying to authenticate...');
  //   console.log(credential);


  //   let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`http://localhost:3000/psychologist?email=${credential.email}&password=${credential.senha}`));
  //   console.log(apiResponse);
  //   if (apiResponse == null || apiResponse.length != 1) {
  //     throw new Error('dados invalidos');
  //   }
  //   return true;
  // }

  // logoutPsychologist() {
  //   localStorage.clear();
  // }

  // isAuthenticatedPsychologist(): boolean {
  //   let token = localStorage.getItem('token');

  //   if (token != null) {
  //     return true;
  //   }
  //   return false;
  // }

  // addCredentialsToLocalStoragePsychologist(email: string) {
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('token', new Date().toLocaleTimeString());
  // }

}
