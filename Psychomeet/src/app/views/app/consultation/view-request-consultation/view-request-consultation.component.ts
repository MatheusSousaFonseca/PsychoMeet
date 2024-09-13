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
    this.users = await this.userReadService.findAll();
  }

  async loadConsultations() {
    let email = localStorage.getItem("email")
    let psychologist = await this.psychologistReadService.findByEmail(email!)
    console.log(psychologist)
    this.consultations = await this.consultationReadService.findByIdPsicologoPendente(psychologist[0].id!);
  }

  getUserName(id: string){
    return this.users.find((user)=>{
      return user.id===id
    })?.nome
    
  }

}
