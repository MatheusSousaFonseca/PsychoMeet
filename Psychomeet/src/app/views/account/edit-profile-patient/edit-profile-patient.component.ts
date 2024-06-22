import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-patient',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile-patient.component.html',
  styleUrl: './edit-profile-patient.component.css'
})
export class EditProfilePatientComponent {

  constructor(private router: Router) { }

  voltar() {
    this.router.navigate(['account/my-profile-patient'])
  }

  salvar() {
    this.router.navigate(['account/my-profile-patient'])
  }

}
