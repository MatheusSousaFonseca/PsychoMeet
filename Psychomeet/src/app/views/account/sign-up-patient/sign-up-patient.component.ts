import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-patient',
  standalone: true,
  imports: [],
  templateUrl: './sign-up-patient.component.html',
  styleUrl: './sign-up-patient.component.css'
})
export class SignUpPatientComponent {

  constructor(private router : Router){}

  entrarAreaPaciente() {
    this.router.navigate(['account/sign-in-patient'])
  }

}
