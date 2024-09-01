import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-profile-psichologist',
  standalone: true,
  imports: [],
  templateUrl: './my-profile-psichologist.component.html',
  styleUrl: './my-profile-psichologist.component.css'
})
export class MyProfilePsichologistComponent {

  modalRef: NgbModalRef | null = null;

  constructor(private router: Router, private modalService: NgbModal) { }

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist'])
  }

  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);

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
