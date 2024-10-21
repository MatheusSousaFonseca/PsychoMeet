import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { ConsultationUpdateService } from '../../../../services/consultation/consultation-update-service';

@Component({
  selector: 'app-view-request-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-request-consultation.component.html',
  styleUrl: './view-request-consultation.component.css'
})
export class ViewRequestConsultationComponent {

  modalRef: NgbModalRef | null = null;

  users: User[] = [];

  selectedConsultation!: Consultation;

  consultations: Consultation[] = [];

  pacientesMap: { [id: number]: string } = {}; // Map to store patient names


  constructor(private router: Router, private modalService: NgbModal, private userReadService: UserReadService, private consultationReadService: ConsultationReadService, private psychologistReadService: PsychologistReadService, private consultationUpdateService: ConsultationUpdateService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConsultations();
  }


  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-psychologist']);

  }

  openMyModal(content: any, consultation: Consultation) {
    this.selectedConsultation = consultation
    this.modalRef = this.modalService.open(content);
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  confirmarConsulta() {
    this.selectedConsultation.status= "ACCEPT"
    console.log(this.selectedConsultation)
    this.consultationUpdateService.update(this.selectedConsultation)

    if (this.modalRef) {
      this.modalRef.close();
    }
    window.location.reload();
  }

  desmarcarConsulta() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/view-request-consultation']);
  }

  async loadUsers() {
    const users = await this.userReadService.findAll();
    this.users = users;

    users.forEach(user => {
      if (user?.id) {
        this.pacientesMap[user.id] = user.nome;
      }
    });
  }

  // Load consultations and preload patient names
  async loadConsultations() {
    let email = localStorage.getItem("email");
    if (email) {
      const psychologist = await this.psychologistReadService.findByEmail(email);
      if (psychologist?.id) {
        this.consultations = await this.consultationReadService.findByIdPsicologoPendente(psychologist.id);
        await this.preloadPacientesNames(); // Ensure patient names are preloaded
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

  getUserName(id: number){
    return this.users.find((user)=>{
      return user.id===id
    })?.nome

  }

}
