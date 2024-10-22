import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreateService } from '../../../services/user/user-create-service';
import { User } from '../../../domain/model/user-model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-patient',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-patient.component.html',
  styleUrls: ['./sign-up-patient.component.css'] // Corrigido para 'styleUrls'
})
export class SignUpPatientComponent implements OnInit {

  form!: FormGroup;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userCreateService: UserCreateService, // Corrigido para seguir a convenção camelCase
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      cpf: ['', Validators.required],
      data: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  async createAccount() {
    if (!this.form.valid || !this.arePasswordsValid()) {
      console.log('Formulário inválido ou senhas não coincidem');
      return;
    }

    let user: User = {
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      senha: this.form.controls['senha'].value,
      cpf: this.form.controls['cpf'].value,
      dataNascimento: this.form.controls['data'].value,
      telefone: this.form.controls['telefone'].value
    };

    try {
      await this.userCreateService.create(user);
      this.successMessage = 'Conta criada com sucesso! Redirecionando para login...';
      setTimeout(() => {
        this.router.navigate(['account/sign-in-patient']);
      }, 2000); // Aguardar 2 segundos antes de redirecionar
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  }

  arePasswordsValid() {
    return this.form.controls['senha'].value === this.form.controls['repeatPassword'].value;
  }
}
