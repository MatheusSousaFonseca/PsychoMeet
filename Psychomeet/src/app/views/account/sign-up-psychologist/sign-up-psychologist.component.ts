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
  styleUrl: './sign-up-psychologist.component.css'
})
export class SignUpPsychologistComponent implements OnInit {

  form!: FormGroup;

  // fullNameMinLength: number = 2;
  // fullNameMaxLength: number = 10;
  // passwordMinLength: number = 2;
  // passwordMaxLength: number = 10;

  constructor(private formBuilder: FormBuilder, private createPsychologistService: PsychologistCreateService, private router: Router) {

  }
  ngOnInit(): void {
  }



  // fullName = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  // email = new FormControl(null, Validators.email);
  // password = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);
  // repeatPassword = new FormControl(null, [Validators.minLength(3), Validators.maxLength(10)]);



  createAccount() {
    console.log('Criando conta....');

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

    this.createPsychologistService.create(psychologist);

    this.router.navigate(['account/sign-in-psychologist']);


  }

  // arePasswordsValid() {
  //   return this.form.controls['password'].value === this.form.controls['repeatPassword'].value;
  // }

}