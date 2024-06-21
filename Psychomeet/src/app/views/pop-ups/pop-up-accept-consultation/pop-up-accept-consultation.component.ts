import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-accept-consultation',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-accept-consultation.component.html',
  styleUrl: './pop-up-accept-consultation.component.css'
})
export class PopUpAcceptConsultationComponent {

  constructor(private router: Router) { }

  confirmarConsulta() {
    this.router.navigate(['consultation/view-request-consultation']);
  }

}
