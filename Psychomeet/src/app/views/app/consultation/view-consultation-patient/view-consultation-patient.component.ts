import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-patient.component.html',
  styleUrl: './view-consultation-patient.component.css'
})
export class ViewConsultationPatientComponent {
  constructor(private router: Router) { }

  marcarConsulta() {
    this.router.navigate(['consultation/search-psychologist']);

  }

  consultasMarcadas() {
    this.router.navigate(['consultation/view-scheduled-consultation']);

  }

  feedback() {
    this.router.navigate(['pop-ups/pop-up-give-feedback']);

  }

}
