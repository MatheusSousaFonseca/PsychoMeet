import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-patient',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-patient.component.html',
  styleUrl: './sign-in-patient.component.css'
})
export class SignInPatientComponent {

  constructor( private router : Router){}

  entrar() {
    this.router.navigate(['consultation/search-psychologist'])
  }

}
