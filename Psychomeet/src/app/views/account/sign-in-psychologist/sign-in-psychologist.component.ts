import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserCredential } from '../../../domain/dto/user-credential';
import { PsychologistCredential } from '../../../domain/dto/psychologist-credencial';

@Component({
  selector: 'app-sign-in-psychologist',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in-psychologist.component.html',
  styleUrl: './sign-in-psychologist.component.css'
})
export class SignInPsychologistComponent implements OnInit {

  email = new FormControl(null);
  senha = new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]);

  isLoginIncorrect = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService) {
    // Inicialize o FormGroup

  }

  ngOnInit(): void {
    this.loginIfCredentialsIsValid();
  }

  loginIfCredentialsIsValid() {
    if (this.authenticationService.isAuthenticatedUser()) {
      this.router.navigate(['account/sign-in-psychologist']);
    }
  }

  async login() {


    let credentials: PsychologistCredential = {
      email: this.email.value!,
      senha: this.senha.value!
    };

    try {
      await this.authenticationService.authenticatePsychologist(credentials);
      this.authenticationService.addCredentialsToLocalStorageUser(credentials.email);
      await this.router.navigate(['consultation/view-consultation-psychologist']);
    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.senha.setValue(null);
    }
  }

  isFormInvalid() {
    let isValid = this.email.valid && this.senha.valid;

    return isValid ? false : true // Retorna verdadeiro se o formulário for inválido
  }

}
