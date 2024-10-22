import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { UserReadService } from '../../../../services/user/user-read-service';
import { consultationFeedback } from '../../../../domain/dto/consultation-feedback';
import { ConsultationFeedbackService } from '../../../../services/consultation/consultation-feedback-service';
import { formatDate, formatPhone } from '../../../../services/utils';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule // Add FormsModule here
  ],
  templateUrl: './view-consultation-patient.component.html',
  styleUrls: ['./view-consultation-patient.component.css']
})
export class ViewConsultationPatientComponent implements OnInit {

  consultations: Consultation[] = [];
  modalRef: NgbModalRef | null = null;
  feedback: string = '';
  rating: number = 0;
  selectedConsultationId: number | null = null; // To hold the selected consultation ID

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
    this.selectedConsultationId = consultation.consultaId; // Set the selected consultation ID
    this.feedback = ''; // Reset feedback
    this.rating = 0;    // Reset rating
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
    console.log('Feedback:', this.feedback); // Check the feedback value
    console.log('Rating:', this.rating); // Check the rating value

    const feedbackData: consultationFeedback = {
      avaliacao: this.feedback,
      nota: this.rating, // Convert rating to string if needed
      consultaId: this.selectedConsultationId!
    };

    // Call the update method to send feedback
    this.consultationFeedbackService.update(feedbackData).then(() => {
      console.log('Feedback submitted successfully');
      this.feedback = ''; // Reset feedback
      this.rating = 0;    // Reset rating
      this.closeMyModal();
    }).catch((error: any) => {
      console.error('Error submitting feedback:', error);
    });
  }

  formatDate(date: string): string {
    return formatDate(date);  // Usando a função de formatação de data
  }

  formatPhone(phone: string): string {
    return formatPhone(phone);  // Usando a função de formatação de telefone
  }
}
