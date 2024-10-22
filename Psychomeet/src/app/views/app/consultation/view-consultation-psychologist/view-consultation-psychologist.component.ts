import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../../services/utils';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrls: ['./view-consultation-psychologist.component.css'],
  imports: [
    CommonModule
  ]
})
export class ViewConsultationPsychologistComponent implements OnInit {

  users: User[] = [];
  consultations: Consultation[] = [];
  pacientesMap: { [id: number]: string } = {}; // Map to store patient names

  constructor(
    private router: Router,
    private userReadService: UserReadService,
    private consultationReadService: ConsultationReadService,
    private psychologistReadService: PsychologistReadService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

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
    const users = await this.userReadService.findAll();
    this.users = users;

    users.forEach(user => {
      if (user?.id) {
        this.pacientesMap[user.id] = user.nome;
      }
    });
    this.cdr.detectChanges(); // Trigger change detection after loading users
  }

  // Load consultations and preload patient names
  async loadConsultations() {
    let email = localStorage.getItem("email");
    console.log("LOAD CONSULTATIONS");
    if (email) {
      const psychologist = await this.psychologistReadService.findByEmail(email);
      if (psychologist?.id) {
        this.consultations = await this.consultationReadService.findByIdPsicologoAccept(psychologist.id);
        await this.preloadPacientesNames(); // Ensure patient names are preloaded
        console.log("LOAD CONSULTATIONS 2222", this.consultations);
        this.cdr.detectChanges(); // Trigger change detection after loading consultations and patient names
      }
    }
  }

  // Load patient names for consultations
  async preloadPacientesNames() {
    const pacienteIds = this.consultations.map(c => c.pessoaId);
    for (const id of pacienteIds) {
      if (!this.pacientesMap[id]) {
        const paciente = await this.userReadService.findById(id);
        if (paciente) {
          this.pacientesMap[id] = paciente.nome;
        }
      }
    }
  }

  getUserName(id: number) {
    return this.users.find(user => user.id == id)?.nome;
  }

  acessarPerfilPsicologo() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

  // trackBy function to optimize ngFor rendering
  trackById(index: number, item: Consultation) {
    return item.consultaId; // Assuming consultation has a unique id
  }

  voltar() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

  logout() {
    this.router.navigate(['app/home']);
  }

  formatDate(date: string): string {
    return formatDate(date);  // Usando a função de formatação de data
  }

  hasFeedback(feedback: string, nota: number){
    return feedback != "" && nota != 0
  }
}
