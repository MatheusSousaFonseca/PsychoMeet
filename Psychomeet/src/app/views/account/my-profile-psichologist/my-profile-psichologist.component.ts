import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbModal
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { Psychologist } from '../../../domain/model/psychologist-model';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PsychologistUpdateService } from '../../../services/psychologist/psychologist-update.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ImageService } from '../../../services/image/image-service';

@Component({
  selector: 'app-my-profile-psichologist',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './my-profile-psichologist.component.html',
  styleUrls: ['./my-profile-psichologist.component.css']
})
export class MyProfilePsichologistComponent implements OnInit {

  form!: FormGroup;
  psychologist!: Psychologist;
  abordagensList: string[] = [];
  especialidadesList: string[] = [];
  imageSrc: string | undefined; // URL for the psychologist's image

  constructor(
    private router: Router,
    private modalService: NgbModal,  // Using NgbModal here
    private psychologistReadService: PsychologistReadService,
    private formBuilder: FormBuilder,
    private psychologistUpdateService: PsychologistUpdateService,
    private http: HttpClient,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.loadPsychologist();
    this.loadEspecialidades();
    this.loadAbordagens();

    this.form = this.formBuilder.group({
      id: [''],  // Add this line to define 'id' in the form group
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      publico: ['', Validators.required],
      descricao: ['', Validators.required],
      crp: ['', Validators.required],
      cpf: ['', Validators.required],
      abordagens: new FormControl([]),
      data: ['', Validators.required],
      preco: ['', Validators.required],
      especialidades: new FormControl([]),
      telefone: ['', Validators.required]
    });

  }

  async loadPsychologist() {
    let email = localStorage.getItem("email");

    let psychologist = await this.psychologistReadService.findByEmail(email!);
    this.psychologist = psychologist;

    // Fetch the image for the psychologist
    this.loadImage(this.psychologist.id!);

    this.form.controls['id'].setValue(this.psychologist.id);
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

  async loadImage(psychologistId: number) {
    try {
      const imageBlob = await this.imageService.fetchImageByPessoaId(psychologistId);
      this.imageSrc = URL.createObjectURL(imageBlob); // Create a URL for the image Blob
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }

  async loadEspecialidades() {
    this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
      .subscribe(data => {
        this.especialidadesList = data.especialidades;
      }, error => {
        console.error('Error loading especialidades:', error);
      });
  }

  loadAbordagens() {
    this.http.get<{ abordagens: string[]; }>('assets/abordagens.json')
      .subscribe(data => {
        this.abordagensList = data.abordagens;
      }, error => {
        console.error('Error loading abordagens:', error);
      });
  }

  openMyModal(): void {
    this.router.navigate(['/account/edit-profile-psichologist']);  // Navega para a página de edição
  }


  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist']);
  }
}
