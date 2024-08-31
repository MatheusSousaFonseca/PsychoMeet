import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrl: './view-consultation-psychologist.component.css'
})
export class ViewConsultationPsychologistComponent {

  users: User[] = [];

  constructor(private router: Router, private userReadService: UserReadService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  consultasPendentes() {
    this.router.navigate(['consultation/view-request-consultation']);
  }

  agenda() {
    this.router.navigate(['consultation/inform-availability']);
  }

  async loadUsers() {
    this.users = await this.userReadService.findAll();
  }

}
