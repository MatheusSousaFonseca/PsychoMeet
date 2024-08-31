import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Horario } from '../../../../domain/model/horario-model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { AvailabilityCreateService } from '../../../../services/availability/availability-create.service';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Availability } from '../../../../domain/model/disponibilidade-psicologo-model';

@Component({
  selector: 'app-inform-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inform-availability.component.html',
  styleUrl: './inform-availability.component.css'
})
export class InformAvailabilityComponent {

  form!: FormGroup;

  modalRef: NgbModalRef | null = null;

  psychologist!: Psychologist

  horaSelecionada!: string

  diaSelecionada!: string

  constructor(private router: Router, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private psychologistReadService: PsychologistReadService, private formBuilder: FormBuilder, private availabilityCreateService: AvailabilityCreateService, private toastrService: ToastrService) {
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
        sabado: "Sábado",
        domingo: "Domingo",
      };
      this.horarioLista.push(horarios);
    }

 

  }

  horarioLista: Horario[] = [];



  days: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  isModalOpen: boolean = true;
  helpRequested: boolean = false;
  selectedTime: string | null = null;
  selectedDay: string | null = null;

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist']);
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  requestHelp(): void {
    this.helpRequested = true;
  }

  confirmAndClose(): void {
    this.isModalOpen = false;
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

  informarDisponibilidade() {
    console.log(`Disponbilidade: ${this.selectedTime} na ${this.selectedDay} salva`);
    this.closeModal();
  }


  async loadPsychologistById(psychologistId: string) {
    this.psychologist = await this.psychologistReadService.findById(psychologistId!);

    console.log(this.psychologist);



    this.form.controls['nome'].setValue(this.psychologist.nome);
    this.form.controls['crp'].setValue(this.psychologist.crp);
    this.form.controls['especialidade'].setValue(this.psychologist.especialidade);

  }

  async salvarDisponibilidade() {
    await this.create() 
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  async create() {
    let availability : Availability = {
      hora: this.horaSelecionada,
      diaDaSemana: this.diaSelecionada
      // nomePsicologo: this.psychologist.nome,
      // idPsicologo: this.psychologist.id!
    }

    let availabilityResponse = await this.availabilityCreateService.create(availability)
    console.log(availabilityResponse);

    if(availabilityResponse.id==''){
      console.log('Entrando...');
      
      this.toastrService.error('Não foi possivel salvar a disponibilidade.')
      return;
    }
    console.log('Saindo');
    
    this.toastrService.success('Disponibilidade salva com sucesso.')






  }



}









