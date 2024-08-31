import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from '../../../../domain/model/horario-model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationCreateServiceService } from '../../../../services/consultation/consultation-create-service.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css'],


})
export class MakeConsultationComponent implements OnInit {

  form!: FormGroup;

  modalRef: NgbModalRef | null = null;

  psychologist!: Psychologist

  horaSelecionada!: string

  diaSelecionada!: string

  constructor(private router: Router, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private psychologistReadService: PsychologistReadService, private formBuilder: FormBuilder, private consultationCreateService:ConsultationCreateServiceService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [''],
      crp: [''],
      especialidade: [''],
      descricao: ['']
    });

    let psychologistId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadPsychologistById(psychologistId!);

    this.times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    for (let i = 8; i < 18; i++) {

      let horarios: Horario = {
        hora: `${i}:00 - ${i + 1}:00`,
        segunda: "Segunda-feira",
        terca: "Terça-feira",
        quarta: "Quarta-feira",
        quinta: "Quinta-feira",
        sexta: "Sexta-feira",
        sabado: "Sabado",
        domingo: "Domingo",
      };
      this.horarioLista.push(horarios);
    }



  }

  async loadPsychologistById(psychologistId: string) {
    this.psychologist = await this.psychologistReadService.findById(psychologistId!);

    console.log(this.psychologist);



    this.form.controls['nome'].setValue(this.psychologist.nome);
    this.form.controls['crp'].setValue(this.psychologist.crp);
    this.form.controls['especialidade'].setValue(this.psychologist.especialidade);
    this.form.controls['descricao'].setValue(this.psychologist.descricao);
  }

  horarioLista: Horario[] = [];



  days: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  isModalOpen: boolean = true;
  helpRequested: boolean = false;
  selectedTime: string | null = null;
  selectedDay: string | null = null;

  voltar() {
    this.router.navigate(['consultation/search-psychologist']);
  }

  // openModal(time: string, day: string): void {
  //   this.router.navigate(['pop-up/pop-up-make-consultation']);

  //   this.selectedTime = time;
  //   this.selectedDay = day;
  //   this.isModalOpen = true;
  //   this.helpRequested = false;
  // }

  closeModal(): void {
    this.isModalOpen = false;
  }

  requestHelp(): void {
    this.helpRequested = true;
  }

  confirmAndClose(): void {
    this.isModalOpen = false;
  }

  makeConsultation() {
    console.log(`Consulta marcada para ${this.selectedTime} na ${this.selectedDay}`);
    this.closeModal();
  }

  openMyModal(content: any, hora: string, diaDaSemana: string ) {
    this.modalRef = this.modalService.open(content);
    this.horaSelecionada = hora
    this.diaSelecionada = diaDaSemana
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  async marcarConsulta() {
    await this.create() 
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  async create() {
    let consultation : Consultation = {
      hora: this.horaSelecionada,
      diaDaSemana: this.diaSelecionada,
      descricao: this.psychologist.descricao,
      nomePsicologo: this.psychologist.nome,
      idPsicologo: this.psychologist.id!
    }

    let consultationResponse = await this.consultationCreateService.create(consultation)
    console.log(consultationResponse);

    if(consultationResponse.id==''){
      console.log('Entrando...');
      
      this.toastrService.error('Não foi possivel marcar consulta.')
      return;
    }
    console.log('Saindo');
    
    this.toastrService.success('Consulta marcada com sucesso.')




  }





}



