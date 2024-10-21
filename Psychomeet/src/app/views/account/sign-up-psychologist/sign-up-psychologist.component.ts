import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { PsychologistCreateService } from '../../../services/psychologist/psychologist-create.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

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
  especialidades: string[] = [];
  abordagens: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private createPsychologistService: PsychologistCreateService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadEspecialidades();
    this.loadAbordagens();

    // Correct FormControl names
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      publico: ['', Validators.required],
      descricao: ['', Validators.required],
      crp: ['', Validators.required],
      cpf: ['', Validators.required],
      abordagens: new FormControl([]), // Use 'abordagens' for multiple selection
      data: ['', Validators.required],
      preco: ['', Validators.required],
      especialidades: new FormControl([]), // Corrected to 'especialidades'
      telefone: ['', Validators.required]
    });
  }

  loadEspecialidades() {
    this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
      .subscribe(data => {
        this.especialidades = data.especialidades;
      }, error => {
        console.error('Error loading especialidades:', error);
      });
  }

  loadAbordagens() {
    this.http.get<{ abordagens: string[] }>('assets/abordagens.json')
      .subscribe(data => {
        this.abordagens = data.abordagens;
      }, error => {
        console.error('Error loading abordagens:', error);
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
      abordagens: this.form.controls['abordagens'].value, // Use 'abordagens'
      dataNascimento: this.form.controls['data'].value,
      preco: this.form.controls['preco'].value,
      especialidades: this.form.controls['especialidades'].value, // Use 'especialidades'
      telefone: this.form.controls['telefone'].value
    };

    try {
      console.log(psychologist);
      await this.createPsychologistService.create(psychologist);
      this.successMessage = 'Conta criada com sucesso! Redirecionando para login...';
      setTimeout(() => {
        this.router.navigate(['account/sign-in-psychologist']);
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  }

  arePasswordsValid() {
    return this.form.controls['senha'].value === this.form.controls['repeatPassword'].value;
  }
}
