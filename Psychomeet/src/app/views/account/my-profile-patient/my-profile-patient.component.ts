import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../domain/model/user-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReadService } from '../../../services/user/user-read-service';
import { UserUpdateService } from '../../../services/user/user-update-service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-my-profile-patient',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,],
  templateUrl: './my-profile-patient.component.html',
  styleUrl: './my-profile-patient.component.css'
})
export class MyProfilePatientComponent implements OnInit {

  modalRef: NgbModalRef | null = null;

  form!: FormGroup;

  user!: User;

  userId?: string;

  constructor(private router: Router, private modalService: NgbModal, private userReadService: UserReadService, private formBuilder: FormBuilder, private userUpdateService: UserUpdateService) { }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
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
    let email = localStorage.getItem("email");
    let user = await this.userReadService.findByEmail(email!)
    this.user = user[0]
    this.form.controls['nome'].setValue(this.user.nome)
    this.form.controls['email'].setValue(this.user.email)
    this.form.controls['senha'].setValue(this.user.senha)
    this.form.controls['telefone'].setValue(this.user.telefone)
    this.form.get('data')?.patchValue(formatDate(user[0].data_nascimento, 'yyyy-MM-dd', 'en'))
    this.form.controls['cpf'].setValue(this.user.cpf)

  }

  voltar() {
    this.router.navigate(['consultation/search-psychologist'])
  }

  async salvar() {
    let user: User = {
      id: this.user.id,
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      senha: this.form.controls['senha'].value,
      telefone: this.form.controls['telefone'].value,
      data_nascimento: this.form.controls['data'].value,
      cpf: this.form.controls['cpf'].value,
    }

    await this.userUpdateService.update(user)
    this.closeMyModal()
    window.location.reload()


  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }





}


