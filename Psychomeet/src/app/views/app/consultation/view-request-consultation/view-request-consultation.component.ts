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
import { ConsultationDeleteService } from '../../../../services/consultation/consultation-delete-service';
import { AgendamentoDisponibilidade } from '../../../../domain/model/agendamento-disponibilidade-model';

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

  selectedAgendamento!: AgendamentoDisponibilidade;

  agendamentos: AgendamentoDisponibilidade[] = [];

  pacientesMap: { [id: number]: string } = {}; 

  constructor(private router: Router,
    private modalService: NgbModal,
    private userReadService: UserReadService,
    private consultationReadService: ConsultationReadService,
    private psychologistReadService: PsychologistReadService,
    private consultationUpdateService: ConsultationUpdateService,
    private consultationDeleteService: ConsultationDeleteService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConsultations();
  }


  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-psychologist']);

  }

  openMyModal(content: any, agendamento: AgendamentoDisponibilidade) {
    this.selectedAgendamento = agendamento
    this.modalRef = this.modalService.open(content);
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  confirmarConsulta() {
    console.log(this.selectedAgendamento)
    this.consultationUpdateService.confirmar(this.selectedAgendamento.id!)

    if (this.modalRef) {
      this.modalRef.close();
    }
    window.location.reload();
  }

  desmarcarConsulta() {
    if (this.selectedAgendamento) {
      console.log(this.selectedAgendamento)
      this.consultationDeleteService.delete(this.selectedAgendamento.id!)
        .then(() => {
          if (this.modalRef) {
            this.modalRef.close();
          }
          window.location.reload();  
        })
        .catch((error: any) => {
          console.error("Erro ao desmarcar a consulta:", error);
        });
    }
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

  async loadConsultations() {
    let email = localStorage.getItem("email");
    if (email) {
      const psychologist = await this.psychologistReadService.findByEmail(email);
      if (psychologist?.id) {
        this.agendamentos = await this.consultationReadService.findByIdPsicologoPendente(psychologist.id);
        await this.preloadPacientesNames(); 
      }
    }
  }

  async preloadPacientesNames() {
    const pacienteIds = this.agendamentos.map(c => c.pessoaIdPaciente);
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
