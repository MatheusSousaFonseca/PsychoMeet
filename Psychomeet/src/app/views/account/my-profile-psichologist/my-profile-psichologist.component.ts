import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-psichologist',
  standalone: true,
  imports: [],
  templateUrl: './my-profile-psichologist.component.html',
  styleUrl: './my-profile-psichologist.component.css'
})
export class MyProfilePsichologistComponent {

  constructor( private router : Router){}

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist'])
  }

}
