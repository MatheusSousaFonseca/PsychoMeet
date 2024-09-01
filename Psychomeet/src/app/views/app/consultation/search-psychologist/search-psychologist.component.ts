import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';

@Component({
  selector: 'app-search-psychologist',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './search-psychologist.component.html',
  styleUrl: './search-psychologist.component.css'
})
export class SearchPsychologistComponent implements OnInit {

  psychologists: Psychologist[] = [];


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
    this.psychologists = await this.psychologistReadService.findAll();
  }
  acessarPerfilPaciente() {
    this.router.navigate(['account/my-profile-patient'])
  }




}
