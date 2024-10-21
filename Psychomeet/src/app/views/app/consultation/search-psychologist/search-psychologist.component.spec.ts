import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { CommonModule } from '@angular/common'; // Ensure this is imported
import { FormsModule } from '@angular/forms'; // Ensure this is imported
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-search-psychologist',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatChipsModule
  ],
  templateUrl: './search-psychologist.component.html',
  styleUrls: ['./search-psychologist.component.css']
})
export class SearchPsychologistComponent implements OnInit {

  psychologists: Psychologist[] = [];
  name: string = ''; // Initialize the name property
  especialidade: string = ''; // Initialize the especialidade property

  constructor(private router: Router, private psychologistReadService: PsychologistReadService) { }

  ngOnInit(): void {
    this.loadPsychologists();
  }

  marcarConsulta(id: string) {
    this.router.navigate([`/consultation/make-consultation/${id}`]);
  }

  historico() {
    this.router.navigate(['consultation/view-consultation-patient']);
  }

  async loadPsychologists() {
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidade);
  }

  // Method to handle the search
  async search() {
    console.log("nome: ", this.name)
    this.psychologists = await this.psychologistReadService.findAll(this.name, this.especialidade);
  }

  acessarPerfilPaciente() {
    this.router.navigate(['account/my-profile-patient']);
  }

  logout() {
    this.router.navigate(['app/home']);
  }
}
