import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-scheduled-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-scheduled-consultation.component.html',
  styleUrl: './view-scheduled-consultation.component.css'
})
export class ViewScheduledConsultationComponent {

  modalRef: NgbModalRef | null = null;

  constructor(private router: Router, private modalService: NgbModal) { }



  remarcarConsulta() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/make-consultation']);
  }
  desmarcarConsulta() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/view-scheduled-consultation']);
  }

  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-patient']);

  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
