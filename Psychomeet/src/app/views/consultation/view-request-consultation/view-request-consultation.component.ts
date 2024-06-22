import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-request-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-request-consultation.component.html',
  styleUrl: './view-request-consultation.component.css'
})
export class ViewRequestConsultationComponent {

  constructor(private router: Router) { }



  aceitarConsulta() {
    this.router.navigate(['pop-ups/pop-up-accept-consultation']);


  }

  recusarConsulta() {
    this.router.navigate(['pop-ups/pop-up-refuse-consultation']);

  }

  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-psychologist']);

  }

}
