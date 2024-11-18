import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PsychologistCreateService } from '../../../services/psychologist/psychologist-create.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-psychologist',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-psychologist.component.html',
  styleUrls: ['./sign-up-psychologist.component.css']
})
export class SignUpPsychologistComponent implements OnInit {
  form!: FormGroup;
  successMessage: string | null = null;
  isSubmitting = false;
  especialidades: string[] = [];
  abordagens: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private createPsychologistService: PsychologistCreateService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.loadAbordagens();

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],  // Nome cannot be blank
      email: ['', [Validators.required, Validators.email]],  // Email must be valid
      senha: ['', Validators.required],  // Senha cannot be blank
      repeatPassword: ['', Validators.required],  // Repeat password cannot be blank
      crp: ['', [Validators.required, Validators.pattern('^[0-9]{7}$')]],  // CRP: exactly 7 digits
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],  // CPF: exactly 11 digits
      data: ['', Validators.required],  // Data de nascimento cannot be blank
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],  // Telefone: exactly 11 digits
      descricao: ['', Validators.required],  // Descrição cannot be blank
      especialidades: new FormControl([], Validators.required),  // Especialidades cannot be blank
      abordagens: new FormControl([], Validators.required)  // Abordagens cannot be blank
    });
  }

  loadEspecialidades() {
    this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
      .subscribe(data => {
        this.especialidades = data.especialidades;
      }, error => {
        console.error('Erro ao carregar especialidades:', error);
      });
  }

  loadAbordagens() {
    this.http.get<{ abordagens: string[] }>('assets/abordagens.json')
      .subscribe(data => {
        this.abordagens = data.abordagens;
      }, error => {
        console.error('Erro ao carregar abordagens:', error);
      });
  }

  async createAccount() {
    if (!this.form.valid || !this.arePasswordsValid()) {
      this.toastr.error('Formulário inválido ou senhas não coincidem');
      return;
    }

    let psychologist: Psychologist = {
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      senha: this.form.controls['senha'].value,
      crp: this.form.controls['crp'].value,
      cpf: this.form.controls['cpf'].value,
      dataNascimento: this.form.controls['data'].value,
      telefone: this.form.controls['telefone'].value,
      descricao: this.form.controls['descricao'].value,
      especialidades: this.form.controls['especialidades'].value,
      abordagens: this.form.controls['abordagens'].value,
      role: 'PSICOLOGO',
      publico: '',
      preco: 0
    };

    this.isSubmitting = true;

    try {
      await this.createPsychologistService.create(psychologist);
      this.toastr.success('Conta criada com sucesso! Redirecionando para login...');
      setTimeout(() => {
        this.router.navigate(['account/sign-in-psychologist']);
      }, 2000);
    } catch (error: any) {
      // Exiba a mensagem de erro clara retornada pelo backend
      this.toastr.error(JSON.stringify(error.error) || 'Erro ao criar conta');
    } finally {
      this.isSubmitting = false;
    }
  }

  arePasswordsValid() {
    return this.form.controls['senha'].value === this.form.controls['repeatPassword'].value;
  }
}
