import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-psichologist',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile-psichologist.component.html',
  styleUrl: './edit-profile-psichologist.component.css'
})
export class EditProfilePsichologistComponent {

  constructor(private router: Router) { }

  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);

  }

  voltar() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

}
