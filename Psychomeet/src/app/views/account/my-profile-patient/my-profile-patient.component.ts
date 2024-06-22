import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-patient',
  standalone: true,
  imports: [],
  templateUrl: './my-profile-patient.component.html',
  styleUrl: './my-profile-patient.component.css'
})
export class MyProfilePatientComponent {

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(['consultation/search-psychologist'])
  }
  editar() {
    this.router.navigate(['account/edit-profile-patient'])
  }

}
