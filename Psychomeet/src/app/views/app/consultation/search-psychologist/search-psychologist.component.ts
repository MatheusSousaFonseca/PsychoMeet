import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ImageService } from '../../../../services/image/image-service';

@Component({
  selector: 'app-search-psychologist',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './search-psychologist.component.html',
  styleUrls: ['./search-psychologist.component.css']
})
export class SearchPsychologistComponent implements OnInit {

  psychologists: Psychologist[] = [];
  name: string = '';
  especialidadeSelecionada: string = '';
  especialidades: string[] = [];
  psychologistImages: { [id: string]: string } = {}; // To store image URLs by psychologist ID

  constructor(
    private router: Router,
    private psychologistReadService: PsychologistReadService,
    private imageService: ImageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadPsychologists();
    this.loadEspecialidades();
  }

  async loadPsychologists() {
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidadeSelecionada);
    this.loadPsychologistImages(); // Load images after fetching psychologists
  }

  async loadPsychologistImages() {
    for (const psychologist of this.psychologists) {
      try {
        const imageBlob = await this.imageService.fetchImageByPessoaId(psychologist.id!);
        this.psychologistImages[psychologist.id!] = URL.createObjectURL(imageBlob); // Map image URL by ID
      } catch (error) {
        console.warn(`Image not found for psychologist ID: ${psychologist.id}`, error);
        this.psychologistImages[psychologist.id!] = 'assets/user.png'; // Fallback to default image
      }
    }
  }

  async search() {
    if (this.especialidadeSelecionada === "Todas as Especialidades") {
      this.especialidadeSelecionada = "";
    }
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidadeSelecionada);
    this.loadPsychologistImages(); // Reload images after search
  }

  marcarConsulta(id: string) {
    this.router.navigate([`/consultation/make-consultation/${id}`]);
  }

  historico() {
    this.router.navigate(['consultation/view-consultation-patient']);
  }

  acessarPerfilPaciente() {
    this.router.navigate(['account/my-profile-patient']);
  }

  loadEspecialidades() {
    this.http.get<{ especialidades: string[] }>('assets/especialidades.json')
      .subscribe(data => {
        this.especialidades = data.especialidades;
      }, error => {
        console.error('Erro ao carregar especialidades:', error);
      });
  }

  logout() {
    this.router.navigate(['app/home']);
  }
}
