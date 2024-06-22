import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router : Router){}

  loginPaciente(){
    this.router.navigate(['account/sign-in-patient'])
  }

  loginPsicologo(){
    this.router.navigate(['account/sign-in-psychologist'])
  }

}
