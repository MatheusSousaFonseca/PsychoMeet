import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PsychologistUpdateService } from '../../../services/psychologist/psychologist-update.service';
import { formatDate } from '@angular/common';

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


  constructor(private router: Router, private modalService: NgbModal, private psychologistReadService: PsychologistReadService, private formBuilder: FormBuilder, private psychologistUpdateService: PsychologistUpdateService) { }


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
    this.psychologist = psychologist[0]
    this.form.controls['nome'].setValue(this.psychologist.nome)
    this.form.controls['email'].setValue(this.psychologist.email)
    this.form.controls['senha'].setValue(this.psychologist.senha)
    this.form.controls['publico'].setValue(this.psychologist.publico)
    this.form.controls['descricao'].setValue(this.psychologist.descricao)
    this.form.controls['crp'].setValue(this.psychologist.crp)
    this.form.controls['cpf'].setValue(this.psychologist.cpf)
    this.form.controls['abordagem'].setValue(this.psychologist.abordagem)
    this.form.get('data')?.patchValue(formatDate(psychologist[0].data_nascimento, 'yyyy-MM-dd', 'en'))
    this.form.controls['preco'].setValue(this.psychologist.preco)
    this.form.controls['especialidade'].setValue(this.psychologist.especialidade)
    this.form.controls['telefone'].setValue(this.psychologist.telefone)
    console.log(this.form.controls['data'].value)


  }

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist'])
  }

  async salvar() {
    console.log(this.form.controls["nome"].value)
    let psychologist: Psychologist = {
      id: this.psychologist.id,
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      publico: this.form.controls['publico'].value,
      descricao: this.form.controls['descricao'].value,
      crp: this.form.controls['crp'].value,
      cpf: this.form.controls['cpf'].value,
      abordagem: this.form.controls['abordagem'].value,
      data_nascimento: this.form.controls['data'].value,
      preco: this.form.controls['preco'].value,
      especialidade: this.form.controls['especialidade'].value,
      senha: this.form.controls['senha'].value,
      telefone: this.form.controls['telefone'].value,
    }

    await this.psychologistUpdateService.update(psychologist)
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
