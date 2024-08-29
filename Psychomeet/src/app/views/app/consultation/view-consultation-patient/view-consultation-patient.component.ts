import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';

@Component({
  selector: 'app-view-consultation-patient',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-patient.component.html',
  styleUrl: './view-consultation-patient.component.css'
})
export class ViewConsultationPatientComponent implements OnInit {

  psychologists: Psychologist[] = [];

  modalRef: NgbModalRef | null = null;

  //psychologists: Psychologist[] = [];

  constructor(private router: Router, private modalService: NgbModal, private psychologistReadService: PsychologistReadService) { }

  ngOnInit(): void {
    this.loadPsychologists();
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

  async loadPsychologists() {
    this.psychologists = await this.psychologistReadService.findAll();
  }

}
