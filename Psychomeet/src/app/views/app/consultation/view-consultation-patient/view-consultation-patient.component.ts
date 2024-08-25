import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-patient.component.html',
  styleUrl: './view-consultation-patient.component.css'
})
export class ViewConsultationPatientComponent {

  modalRef: NgbModalRef | null = null;

  constructor(private router: Router, private modalService: NgbModal) { }

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

}
