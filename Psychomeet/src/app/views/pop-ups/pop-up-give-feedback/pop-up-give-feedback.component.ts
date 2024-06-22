import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-give-feedback',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-give-feedback.component.html',
  styleUrl: './pop-up-give-feedback.component.css'
})
export class PopUpGiveFeedbackComponent {

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(['consultation/view-consultation-patient']);


  }


}
