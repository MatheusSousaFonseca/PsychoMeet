import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-make-consultation',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-make-consultation.component.html',
  styleUrl: './pop-up-make-consultation.component.css'
})
export class PopUpMakeConsultationComponent {

  constructor(private router: Router) { }

  confirmarConsulta() {
    this.router.navigate(['consultation/make-consultation']);
  }

}
