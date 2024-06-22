import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-psychologist.component.html',
  styleUrl: './sign-in-psychologist.component.css'
})
export class SignInPsychologistComponent {

  constructor(private router : Router){}

  entrarPsicologo() {
    this.router.navigate(['consultation/view-consultation-psychologist'])
  }

}
