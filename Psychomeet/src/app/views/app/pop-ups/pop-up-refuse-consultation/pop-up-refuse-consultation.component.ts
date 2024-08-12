import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-refuse-consultation',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-refuse-consultation.component.html',
  styleUrl: './pop-up-refuse-consultation.component.css'
})
export class PopUpRefuseConsultationComponent {
  constructor(private router: Router) { }

  recusarConsulta() {
    this.router.navigate(['consultation/view-request-consultation']);
  }


}
