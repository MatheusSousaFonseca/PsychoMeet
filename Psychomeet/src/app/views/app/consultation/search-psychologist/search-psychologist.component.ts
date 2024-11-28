import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { CommonModule } from '@angular/common'; // Ensure this is imported
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ensure this is imported
import {MatChipsModule} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
  name: string = ''; // Initialize the name property
  especialidadeSelecionada: string = ''; // Initialize the especialidade property


  especialidades: string[] = [];

  constructor(
    private router: Router,
    private psychologistReadService: PsychologistReadService ,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPsychologists();
    this.loadEspecialidades();
  }

  marcarConsulta(id: string) {
    this.router.navigate([`/consultation/make-consultation/${id}`]);
  }

  historico() {
    this.router.navigate(['consultation/view-consultation-patient']);
  }

  async loadPsychologists() {
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidadeSelecionada);
  }

  // Method to handle the search
  async search() {
    console.log("nome: ", this.name)
    console.log("especialidade: ", this.especialidadeSelecionada)
    if(this.especialidadeSelecionada == "Todas as Especialidades"){
      this.especialidadeSelecionada = "";
    }
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidadeSelecionada);
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
