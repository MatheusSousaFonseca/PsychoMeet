import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadServiceService } from '../../../../services/consultation/consultation-read-service';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './view-consultation-patient.component.html',
  styleUrl: './view-consultation-patient.component.css'
})
export class ViewConsultationPatientComponent implements OnInit {

  consultations: Consultation[] = [];

  modalRef: NgbModalRef | null = null;

  constructor(private router: Router, private modalService: NgbModal, private psychologistReadService: PsychologistReadService, private consultationReadService: ConsultationReadServiceService) { }

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
    this.consultations = await this.consultationReadService.findAll();
  }

}
