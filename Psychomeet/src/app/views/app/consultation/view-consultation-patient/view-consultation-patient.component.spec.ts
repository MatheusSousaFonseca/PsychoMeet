import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { UserReadService } from '../../../../services/user/user-read-service';
import { consultationFeedback } from '../../../../domain/dto/consultation-feedback';
import { ConsultationFeedbackService } from '../../../../services/consultation/consultation-feedback-service';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule 
  ],
  templateUrl: './view-consultation-patient.component.html',
  styleUrls: ['./view-consultation-patient.component.css']
})
export class ViewConsultationPatientComponent implements OnInit {

  consultations: Consultation[] = [];
  modalRef: NgbModalRef | null = null;
  feedback: string = '';
  rating: number = 0;
  selectedConsultationId: number | null = null; 

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private consultationReadService: ConsultationReadService,
    private userReadService: UserReadService,
    private consultationFeedbackService: ConsultationFeedbackService,
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

  openMyModal(content: any, consultation: Consultation) {
    this.selectedConsultationId = consultation.consultaId;
    this.feedback = ''; 
    this.rating = 0;    
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

  // Submit feedback
  submitFeedback() {
    console.log('Feedback:', this.feedback); 
    console.log('Rating:', this.rating); 

    const feedbackData: consultationFeedback = {
      avaliacao: this.feedback,
      nota: this.rating, 
      consultaId: this.selectedConsultationId!
    };

   
    this.consultationFeedbackService.update(feedbackData).then(() => {
      console.log('Feedback submitted successfully');
      this.feedback = ''; 
      this.rating = 0;    
      this.loadConsultations();
      this.closeMyModal();
    }).catch((error: any) => {
      console.error('Error submitting feedback:', error);
    });
  }
}
