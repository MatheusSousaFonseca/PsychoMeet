import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../domain/model/user-model';

@Component({
  selector: 'app-my-profile-patient',
  standalone: true,
  imports: [],
  templateUrl: './my-profile-patient.component.html',
  styleUrl: './my-profile-patient.component.css'
})
export class MyProfilePatientComponent {

  modalRef: NgbModalRef | null = null;

  userId?: string;

  constructor(private router: Router, private modalService: NgbModal) { }

  voltar() {
    this.router.navigate(['consultation/search-psychologist'])
  }

  salvar() {
    this.router.navigate(['account/my-profile-patient']);

  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  openMyModal(content: any) {
    this.modalRef = this.modalService.open(content);
  }





}
