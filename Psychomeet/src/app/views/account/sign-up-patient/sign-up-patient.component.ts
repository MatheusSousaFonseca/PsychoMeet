import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreateService } from '../../../services/user/user-create-service';
import { User } from '../../../domain/model/user-model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';  // Usar o toastr para exibir mensagens ao usuário

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
  styleUrls: ['./sign-up-patient.component.css']
})
export class SignUpPatientComponent implements OnInit {

  form!: FormGroup;
  successMessage: string | null = null;
  isSubmitting = false;  // Para desabilitar o botão durante o envio

  constructor(
    private formBuilder: FormBuilder,
    private userCreateService: UserCreateService,
    private toastr: ToastrService,  // Injeção de ToastrService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]], // Senha com validação mínima de 6 caracteres
      repeatPassword: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Validação para CPF (11 dígitos)
      data: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]] // Validação para telefone (11 dígitos)
    });
  }

  async createAccount() {


    let user: User = {
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      senha: this.form.controls['senha'].value,
      cpf: this.form.controls['cpf'].value,
      dataNascimento: this.form.controls['data'].value,
      telefone: this.form.controls['telefone'].value
    };

    this.isSubmitting = true; // Iniciar o estado de envio

    try {
      await this.userCreateService.create(user);
      this.toastr.success('Conta criada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        this.router.navigate(['account/sign-in-patient']);
      }, 2000); // Aguardar 2 segundos antes de redirecionar
    } catch (error: any) {
      this.toastr.error(JSON.stringify(error.message) || 'Erro ao criar conta');
    } finally {
      this.isSubmitting = false; // Encerrar o estado de envio
    }
  }

  arePasswordsValid() {
    return this.form.controls['senha'].value === this.form.controls['repeatPassword'].value;
  }
}
