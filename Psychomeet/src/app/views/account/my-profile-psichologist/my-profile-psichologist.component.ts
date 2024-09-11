import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile-psichologist',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './my-profile-psichologist.component.html',
  styleUrl: './my-profile-psichologist.component.css'
})
export class MyProfilePsichologistComponent implements OnInit {

  modalRef: NgbModalRef | null = null;
  form!: FormGroup;

  psychologist!: Psychologist;

  constructor(private router: Router, private modalService: NgbModal, private psychologistReadService: PsychologistReadService, private formBuilder: FormBuilder,) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
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
    this.loadPsychologist();

  }

  async loadPsychologist() {
    let email = localStorage.getItem("email");
    let psychologist = await this.psychologistReadService.findByEmail(email!)
    console.log(psychologist)
    this.form.controls['nome'].setValue('akakakak')
    this.form.controls['email'].setValue(this.psychologist.email)
    this.form.controls['senha'].setValue(this.psychologist.senha)
    this.form.controls['publico'].setValue(this.psychologist.publico)
    this.form.controls['descricao'].setValue(this.psychologist.descricao)
    this.form.controls['crp'].setValue(this.psychologist.crp)
    this.form.controls['cpf'].setValue(this.psychologist.cpf)
    this.form.controls['abordagem'].setValue(this.psychologist.abordagem)
    this.form.controls['data'].setValue(this.psychologist.data_nascimento)
    this.form.controls['preco'].setValue(this.psychologist.preco)
    this.form.controls['especialidade'].setValue(this.psychologist.especialidade)
    this.form.controls['telefone'].setValue(this.psychologist.telefone)
    console.log(this.form.controls['nome'].value)
    console.log(psychologist.nome)

  }

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist'])
  }

  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);

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
