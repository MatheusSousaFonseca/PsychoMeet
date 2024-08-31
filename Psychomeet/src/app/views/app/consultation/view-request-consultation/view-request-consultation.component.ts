import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';

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

  consultations: Consultation[] = [];

  constructor(private router: Router, private modalService: NgbModal, private userReadService: UserReadService, private consultationReadService: ConsultationReadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConsultations();
  }


  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-psychologist']);

  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  confirmarConsulta() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/view-request-consultation']);
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
    this.consultations = await this.consultationReadService.findAll();
  }

}
