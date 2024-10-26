import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../../../domain/model/user-model';
import { UserReadService } from '../../../services/user/user-read-service';
import { formatDate } from '@angular/common';
import { EditProfilePatientComponent } from '../edit-profile-patient/edit-profile-patient.component';

@Component({
  selector: 'app-my-profile-patient',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, EditProfilePatientComponent],
  templateUrl: './my-profile-patient.component.html',
  styleUrls: ['./my-profile-patient.component.css']
})
export class MyProfilePatientComponent implements OnInit {

  form!: FormGroup;
  user!: User;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private userReadService: UserReadService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],  // Added this field to store user.id
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      data: ['', Validators.required],
      telefone: ['', Validators.required]
    });

    this.loadUser();
  }

  async loadUser() {
    const email = localStorage.getItem("email");
    if (email) {
      const user = await this.userReadService.findByEmail(email);
      if (user) {
        this.user = user;

        // Set form values, including id
        this.form.controls['id'].setValue(user.id);  // Set user.id here
        this.form.controls['nome'].setValue(user.nome);
        this.form.controls['email'].setValue(user.email);
        this.form.controls['senha'].setValue(user.senha);
        this.form.controls['telefone'].setValue(user.telefone);
        this.form.get('data')?.patchValue(formatDate(user.dataNascimento, 'yyyy-MM-dd', 'en'));
        this.form.controls['cpf'].setValue(user.cpf);
      }
    } else {
      console.error("Usuário não encontrado.");
    }
  }

  openMyModal() {
    const modalRef = this.modalService.open(EditProfilePatientComponent);
    modalRef.componentInstance.form = this.form; // Passing the form with user.id to modal
  }

  voltar() {
    this.router.navigate(['consultation/search-psychologist']);
  }
}
