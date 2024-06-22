
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Psychomeet';

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['app/home'])
  }

  acessarPerfilPaciente() {
    this.router.navigate(['account/my-profile-patient'])
  }

  acessarPerfilPsicologo() {
    this.router.navigate(['account/my-profile-psichologist'])
  }
}
