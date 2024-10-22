import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationDeleteService } from '../../../../services/consultation/consultation-delete-service';
import { ToastrService } from 'ngx-toastr';
import { UserReadService } from '../../../../services/user/user-read-service';


@Component({
  selector: 'app-view-scheduled-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-scheduled-consultation.component.html',
  styleUrl: './view-scheduled-consultation.component.css'
})
export class ViewScheduledConsultationComponent {

  modalRef: NgbModalRef | null = null;



  consultations: Consultation[] = [];

  consultation: any;



  constructor(private router: Router, private modalService: NgbModal, private consultationReadService: ConsultationReadService, private consultationDeleteService: ConsultationDeleteService,private toastrService: ToastrService, private userReadService: UserReadService) { }

  ngOnInit(): void {
    this.loadConsultations();
  }

  remarcarConsulta() {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['consultation/make-consultation']);
  }

//   desmarcarConsulta() {
//     if (this.modalRef) {
//       this.modalRef.close();
//     }
//     this.router.navigate(['consultation/view-scheduled-consultation']);
//   }

async desmarcarConsulta(consultationId: string) {
  try {
    // throw new Error('erro comentado com o proposito de cair no catch');

    console.log('iniciando a remocao da consulta' + consultationId);
    // await this.consultationDeleteService.delete(consultationId);

    this.toastrService.success('Produto removido com sucesso!');

    await this.loadConsultations();
  } catch (error) {
    this.toastrService.error('Não foi possível remover o produto');
  }

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

  async loadConsultations() {
    let email = localStorage.getItem("email")
    let paciente = await this.userReadService.findByEmail(email!)
    this.consultations = await this.consultationReadService.findByIdPacientePendente(paciente.id!);
  }
}
