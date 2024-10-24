import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { CommonModule } from '@angular/common';
import { NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PacienteReadService } from '../../../../services/pacient/pacient-read-service';
import { Paciente } from '../../../../domain/model/paciente-model';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrls: ['./view-consultation-psychologist.component.css'],
  imports: [
    CommonModule,
    NgbRatingModule,
    NgbTooltipModule
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
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private pacienteReadService: PacienteReadService
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
    let paciente: Paciente;

    for (const user of users) {
      if (user?.id) {
        // Await the result of findByPessoaId
        paciente = await this.pacienteReadService.findByPessoaId(user.id);

        // Check if paciente is defined before using it
        if (paciente?.id) {
          this.pacientesMap[paciente.id] = user.nome;
        }
      }
    }

    this.cdr.detectChanges(); // Trigger change detection after loading users
  }


  // Load consultations and preload patient names
  async loadConsultations() {
    let email = localStorage.getItem("email");
    if (email) {
      const psychologist = await this.psychologistReadService.findByEmail(email);
      if (psychologist?.id) {
        this.consultations = await this.consultationReadService.findByIdPsicologoAccept(psychologist.id);
        await this.preloadPacientesNames(); // Ensure patient names are preloaded
        console.log("LOAD Pacientes 2222", this.pacientesMap);
        console.log("LOAD CONSULTATIONS 2222", this.consultations);
        this.cdr.detectChanges(); // Trigger change detection after loading consultations and patient names
      }
    }
  }

  // Load patient names for consultations
  async preloadPacientesNames() {
    console.log("CONSULTAS ULTIMATE: ", this.consultations);
    const pessoaIds = this.consultations.map(c => c.pessoaId);
    console.log("Paciente ULTIMATE: ", pessoaIds);


    for (const id of pessoaIds) {
      if (!this.pacientesMap[id]) {
        console.log(id)
        const paciente = await this.userReadService.findById(id);
        if (paciente) {
          this.pacientesMap[id] = paciente.nome;
        }
      }
    }
  }

  loadPacienteName(){

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

  hasFeedback(feedback: string, nota: number){
    return feedback != "" && nota != 0
  }

  formatDate(date: string): string {
    const dateFormatted =  this.addDays(new Date(date), 1)


    return dateFormatted.toLocaleDateString();  // Usando a função de formatação de data
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}
