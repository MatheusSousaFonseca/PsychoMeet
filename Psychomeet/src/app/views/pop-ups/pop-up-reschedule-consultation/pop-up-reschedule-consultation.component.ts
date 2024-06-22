import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-reschedule-consultation',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-reschedule-consultation.component.html',
  styleUrl: './pop-up-reschedule-consultation.component.css'
})
export class PopUpRescheduleConsultationComponent {
  constructor(private router: Router) { }

  marcarConsulta() {
    this.router.navigate(['consultation/make-consultation']);
  }

}
