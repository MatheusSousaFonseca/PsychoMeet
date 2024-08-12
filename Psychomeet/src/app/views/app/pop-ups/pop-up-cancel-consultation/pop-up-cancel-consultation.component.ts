import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-cancel-consultation',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-cancel-consultation.component.html',
  styleUrl: './pop-up-cancel-consultation.component.css'
})
export class PopUpCancelConsultationComponent {

  constructor(private router: Router) { }

  cancelarConsulta() {
    this.router.navigate(['consultation/view-scheduled-consultation']);
  }
}
