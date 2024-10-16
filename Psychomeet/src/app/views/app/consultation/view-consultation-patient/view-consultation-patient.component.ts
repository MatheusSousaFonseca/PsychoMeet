import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { UserReadService } from '../../../../services/user/user-read-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './view-consultation-patient.component.html',
  styleUrls: ['./view-consultation-patient.component.css']
})
export class ViewConsultationPatientComponent implements OnInit {

  consultations: Consultation[] = [];

  modalRef: NgbModalRef | null = null;

  feedback: string = '';
  rating: number = 0;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private psychologistReadService: PsychologistReadService,
    private consultationReadService: ConsultationReadService,
    private userReadService: UserReadService
  ) { }
  ngOnInit(): void {
    this.loadConsultations();
  }

  marcarConsulta() {
    this.router.navigate(['consultation/search-psychologist']);

  }

  consultasMarcadas() {

    this.router.navigate(['consultation/view-scheduled-consultation']);

  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  voltar() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/view-consultation-patient']);
  }

  async loadConsultations() {
    let email = localStorage.getItem("email");
    let paciente = await this.userReadService.findByEmail(email!);
    this.consultations = await this.consultationReadService.findByIdPacienteAccept(paciente.id!);
  }

  submitFeedback() {
    console.log("Feedback:", this.feedback);
    console.log("Rating:", this.rating);
    this.closeMyModal();
  }

}
