import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrl: './view-consultation-psychologist.component.css'
})
export class ViewConsultationPsychologistComponent {

  users: User[] = [];

  consultations: Consultation[] = [];

  constructor(private router: Router, private userReadService: UserReadService, private consultationReadService: ConsultationReadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConsultations();
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

  async loadConsultations() {
    this.consultations = await this.consultationReadService.findAll();
  }

}
