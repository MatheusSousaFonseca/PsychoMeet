import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserCredential } from '../../../domain/dto/user-credential';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-in-patient',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in-patient.component.html',
  styleUrls: ['./sign-in-patient.component.css']
})
export class SignInPatientComponent implements OnInit {

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
      this.router.navigate(['account/sign-in-patient']);
    }
  }

  async login() {


    let credentials: UserCredential = {
      email: this.email.value!,
      senha: this.senha.value!
    };

    try {
      await this.authenticationService.authenticateUser(credentials);
      this.authenticationService.addCredentialsToLocalStorageUser(credentials.email);
      await this.router.navigate(['consultation/search-psychologist']);
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
