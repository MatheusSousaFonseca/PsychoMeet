import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrl: './view-consultation-psychologist.component.css'
})
export class ViewConsultationPsychologistComponent {

  constructor(private router: Router) { }

  consultasPendentes() {
    this.router.navigate(['consultation/view-request-consultation']);
  }

  agenda() {
    this.router.navigate(['pop-ups/pop-up-inform-availability']);
  }

}
