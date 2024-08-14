import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {

  constructor( private router : Router){}

  voltarTelaInicial() {
    this.router.navigate(['app/home'])
  }

}
