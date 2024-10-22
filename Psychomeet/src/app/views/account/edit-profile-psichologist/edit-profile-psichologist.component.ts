import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PsychologistUpdateService } from '../../../services/psychologist/psychologist-update.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbActiveModal
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile-psichologist',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,CommonModule, MatOptionModule, MatSelectModule],
  templateUrl: './edit-profile-psichologist.component.html',
  styleUrls: ['./edit-profile-psichologist.component.css']
})
export class EditProfilePsichologistComponent {

  form!: FormGroup;
  abordagensList: string[] = [];
  especialidadesList: string[] = [];
  psychologistId : number | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private psychologistReadService: PsychologistReadService,
    private psychologistUpdateService: PsychologistUpdateService,
    private http: HttpClient,
    private route: ActivatedRoute
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
      abordagens: [[]],
      data: ['', Validators.required],
      preco: ['', Validators.required],
      especialidades: [[]],
      telefone: ['', Validators.required]
    });

    this.loadPsychologist();
    this.loadAbordagens();
    this.loadEspecialidades();
  }

  async loadPsychologist() {
    let email = localStorage.getItem("email");
    let psychologist = await this.psychologistReadService.findByEmail(email!);
    this.psychologistId = psychologist.id;
    if (psychologist) {
      this.form.patchValue(psychologist);
    }
  }

  loadAbordagens() {
    this.http.get<{ abordagens: string[] }>('assets/abordagens.json')
      .subscribe(data => {
        this.abordagensList = data.abordagens;
      });
  }

  loadEspecialidades() {
    this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
      .subscribe(data => {
        this.especialidadesList = data.especialidades;
      });
  }

  async salvar() {

      try {
        await this.psychologistUpdateService.update(this.form.value, this.psychologistId);
        this.router.navigate(['/account/my-profile-psichologist']);
      } catch (error) {
        console.error('Error updating psychologist:', error);
      }
  }

  voltar() {
    this.router.navigate(['/account/my-profile-psichologist']);
  }
}
