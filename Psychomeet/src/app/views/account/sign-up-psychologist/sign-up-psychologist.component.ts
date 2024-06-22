import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-psychologist.component.html',
  styleUrl: './sign-up-psychologist.component.css'
})
export class SignUpPsychologistComponent {

  constructor(private router : Router) {}

  entrarAreaPsicologo() {
    this.router.navigate(['account/sign-in-psychologist'])
  }

}



