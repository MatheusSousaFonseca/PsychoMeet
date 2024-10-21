import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PsychologistUpdateService } from '../../../services/psychologist/psychologist-update.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-profile-psichologist',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule
  ],
  templateUrl: './my-profile-psichologist.component.html',
  styleUrls: ['./my-profile-psichologist.component.css']
})
export class MyProfilePsichologistComponent implements OnInit {

  modalRef: NgbModalRef | null = null;
  form!: FormGroup;
  psychologist!: Psychologist;

  abordagens: string[] = [];
  especialidades: string[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private psychologistReadService: PsychologistReadService,
    private formBuilder: FormBuilder,
    private psychologistUpdateService: PsychologistUpdateService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      publico: ['', Validators.required],
      descricao: ['', Validators.required],
      crp: ['', Validators.required],
      cpf: ['', Validators.required],
      abordagens: [[], Validators.required],
      data: ['', Validators.required],
      preco: ['', Validators.required],
      especialidades: [[], Validators.required],
      telefone: ['', Validators.required]
    });

    this.loadPsychologist();
    this.loadEspecialidades();
    this.loadAbordagens();
  }

  async loadPsychologist() {
    let email = localStorage.getItem("email");
    let psychologist = await this.psychologistReadService.findByEmail(email!);
    this.psychologist = psychologist;

    // Carregar valores do psicólogo no formulário
    this.form.controls['nome'].setValue(this.psychologist.nome);
    this.form.controls['email'].setValue(this.psychologist.email);
    this.form.controls['senha'].setValue(this.psychologist.senha);
    this.form.controls['publico'].setValue(this.psychologist.publico);
    this.form.controls['descricao'].setValue(this.psychologist.descricao);
    this.form.controls['crp'].setValue(this.psychologist.crp);
    this.form.controls['cpf'].setValue(this.psychologist.cpf);
    this.form.controls['abordagens'].setValue(this.psychologist.abordagens);
    this.form.controls['data'].setValue(this.psychologist.dataNascimento);
    this.form.controls['preco'].setValue(this.psychologist.preco);
    this.form.controls['especialidades'].setValue(this.psychologist.especialidades);
    this.form.controls['telefone'].setValue(this.psychologist.telefone);
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

  async salvar() {
    let psychologist: Psychologist = {
      id: this.psychologist.id,
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      publico: this.form.controls['publico'].value,
      descricao: this.form.controls['descricao'].value,
      crp: this.form.controls['crp'].value,
      cpf: this.form.controls['cpf'].value,
      abordagens: this.form.controls['abordagens'].value,
      dataNascimento: this.form.controls['data'].value,
      preco: this.form.controls['preco'].value,
      especialidades: this.form.controls['especialidades'].value,
      senha: this.form.controls['senha'].value,
      telefone: this.form.controls['telefone'].value,
    };

    await this.psychologistUpdateService.update(psychologist);
    this.closeMyModal();
    window.location.reload();
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist']);
  }
}
