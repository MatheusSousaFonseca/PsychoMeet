import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PsychologistCreateService } from '../../../services/psychologist/psychologist-create.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-up-psychologist',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-psychologist.component.html',
  styleUrls: ['./sign-up-psychologist.component.css'] // Corrigido para 'styleUrls'
})
export class SignUpPsychologistComponent implements OnInit {

  form!: FormGroup;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private createPsychologistService: PsychologistCreateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      publico: ['', Validators.required],
      descricao: ['', Validators.required],
      crp: ['', Validators.required],
      cpf: ['', Validators.required],
      abordagem: ['', Validators.required],
      data: ['', Validators.required],
      preco: ['', Validators.required],
      especialidade: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  async createAccount() {
    if (!this.form.valid || !this.arePasswordsValid()) {
      console.log('Formulário inválido ou senhas não coincidem');
      return;
    }

    let psychologist: Psychologist = {
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      senha: this.form.controls['senha'].value,
      publico: this.form.controls['publico'].value,
      descricao: this.form.controls['descricao'].value,
      crp: this.form.controls['crp'].value,
      cpf: this.form.controls['cpf'].value,
      abordagem: this.form.controls['abordagem'].value,
      data_nascimento: this.form.controls['data'].value,
      preco: this.form.controls['preco'].value,
      especialidade: this.form.controls['especialidade'].value,
      telefone: this.form.controls['telefone'].value
    };

    try {
      await this.createPsychologistService.create(psychologist);
      this.successMessage = 'Conta criada com sucesso! Redirecionando para login...';
      setTimeout(() => {
        this.router.navigate(['account/sign-in-psychologist']);
      }, 2000); // Aguardar 2 segundos antes de redirecionar
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  }

  arePasswordsValid() {
    return this.form.controls['senha'].value === this.form.controls['repeatPassword'].value;
  }

}
