import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './search-psychologist.component.html',
  styleUrl: './search-psychologist.component.css'
})
export class SearchPsychologistComponent {

  constructor(private router: Router) { }

  marcarConsulta() {
    this.router.navigate(['consultation/make-consultation']);


  }

  historico() {
    this.router.navigate(['consultation/view-consultation-patient']);


  }




}
