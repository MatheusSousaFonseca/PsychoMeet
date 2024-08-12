import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-scheduled-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-scheduled-consultation.component.html',
  styleUrl: './view-scheduled-consultation.component.css'
})
export class ViewScheduledConsultationComponent {

  constructor(private router: Router) { }



  remarcarConsulta() {
    this.router.navigate(['pop-ups/pop-up-reschedule-consultation']);


  }

  cancelarConsulta() {
    this.router.navigate(['pop-ups/pop-up-cancel-consultation']);

  }

  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-patient']);

  }

}
