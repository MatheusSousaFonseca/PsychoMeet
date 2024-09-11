import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsychologistReadService } from '../../../services/psychologist/psychologist-read.service';

@Component({
  selector: 'app-edit-profile-psichologist',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile-psichologist.component.html',
  styleUrl: './edit-profile-psichologist.component.css'
})
export class EditProfilePsichologistComponent {

  constructor(private router: Router, private psychologistReadService: PsychologistReadService) { }



  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);

  }

  voltar() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

}
