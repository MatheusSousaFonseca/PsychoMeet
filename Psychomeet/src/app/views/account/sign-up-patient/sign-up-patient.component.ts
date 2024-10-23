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
      email: ['', [Validators.required, Validators.email]], // Validação de email
      senha: ['', [Validators.required, Validators.minLength(6)]], // Senha com validação mínima de 6 caracteres
      repeatPassword: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // CPF: exatamente 11 dígitos
      data: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]] // Telefone: exatamente 11 dígitos
    });
  }

  async createAccount() {

    if (!this.form.valid) {
      this.toastr.error('Por favor, corrija os erros antes de continuar.');
      return;
    }

    if (!this.arePasswordsValid()) {
      this.toastr.error('As senhas não coincidem.');
      return;
    }

    // Remove formatação antes de enviar para o servidor
    const cleanCPF = this.form.controls['cpf'].value.replace(/\D/g, '');
    const cleanPhone = this.form.controls['telefone'].value.replace(/\D/g, '');

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

  formatCPF(event: any): void {
    const input = event.target.value.replace(/\D/g, '');  // Remove tudo que não for número
    let formattedCPF = input;

    if (input.length > 3) {
      formattedCPF = input.slice(0, 3) + '.' + input.slice(3);
    }
    if (input.length > 6) {
      formattedCPF = formattedCPF.slice(0, 7) + '.' + input.slice(6);
    }
    if (input.length > 9) {
      formattedCPF = formattedCPF.slice(0, 11) + '-' + input.slice(9, 11);
    }

    event.target.value = formattedCPF;
  }

  formatPhoneNumber(event: any): void {
    const input = event.target.value.replace(/\D/g, '');  // Remove tudo que não for número
    let formattedPhone = input;

    if (input.length > 2) {
      formattedPhone = '(' + input.slice(0, 2) + ') ' + input.slice(2);
    }
    if (input.length > 7) {
      formattedPhone = formattedPhone.slice(0, 9) + '-' + input.slice(7);
    }

    event.target.value = formattedPhone;
  }
}
