import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from '../../../../domain/model/horario-model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationCreateService } from '../../../../services/consultation/consultation-create-service';
import { ToastrService } from 'ngx-toastr';
import { UserReadService } from '../../../../services/user/user-read-service';
import { AgendamentoDisponibilidade } from '../../../../domain/model/agendamento-disponibilidade-model';
import { Availability } from '../../../../domain/model/disponibilidade-psicologo-model';
import { AvailabilityReadService } from '../../../../services/availability/availability-read.service';
import { AvailabilityCreateService } from '../../../../services/availability/availability-create.service';
import { AvailabilityDeleteService } from '../../../../services/availability/availability-delete.service';
import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Agendamento } from '../../../../domain/model/agendamento-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';




@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css'],
  standalone: true,
  imports: [CommonModule]


})
export class MakeConsultationComponent implements OnInit {



  form!: FormGroup;
  modalRef: NgbModalRef | null = null;
  psychologist!: Psychologist;
  horaSelecionada!: string;
  diaSelecionada!: Date;
  horarioLista: { hora: string }[] = [];
  weekDays: Date[] = [];
  startOfWeek!: Date;
  endOfWeek!: Date;

  disponibilidades: Availability[] = [];
  consultasMarcadas: Consultation[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private psychologistReadService: PsychologistReadService,
    private availabilityReadService: AvailabilityReadService,
    private availabilityCreateService: AvailabilityCreateService,
    private availabilityDeleteService: AvailabilityDeleteService,
    private toastrService: ToastrService,
    private consultationCreateService: ConsultationCreateService,
    private activatedRoute: ActivatedRoute,
    private userReadService: UserReadService,
    private consultationReadService: ConsultationReadService
  ) {
    registerLocaleData(localePt, 'pt-BR');
   }

  ngOnInit(): void {
    this.initializeHorarios();
    this.loadPsychologist();

    
    this.setWeek(new Date());
  }

  
  async loadPsychologist() {
    const psychologistId = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (psychologistId) {
      this.psychologist = await this.psychologistReadService.findById(psychologistId);
      this.loadDisponibilidade(this.psychologist.id!);
      this.loadConsultasMarcadas(this.psychologist.id!)
    }
  }

  
  async loadDisponibilidade(psychologistId: number) {
    this.disponibilidades = await this.availabilityReadService.findByPsicologo(psychologistId);
  }

  async loadConsultasMarcadas(psychologistId: number) {
    this.consultasMarcadas = await this.consultationReadService.findByIdPsicologoAccept(psychologistId);
  }

  isConsultaMarcada(dia: Date, hora: string): boolean {
    return this.consultasMarcadas.some(
      (consulta) =>
        this.sameDay(this.addDays(new Date(consulta.data), 1), dia) &&
        consulta.horaIntervalo === hora
    );
  }

  
  initializeHorarios() {
    for (let i = 8; i < 18; i++) {
      this.horarioLista.push({ hora: `${i}:00 - ${i + 1}:00` });
    }
  }

  
  setWeek(date: Date) {
    
    this.startOfWeek = this.getStartOfWeek(date);
    this.endOfWeek = this.getEndOfWeek(date);

    
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(this.startOfWeek);
      day.setDate(this.startOfWeek.getDate() + i);
      this.weekDays.push(day);
    }
  }

  getDayWithDate(date: Date): string {
    const dayName = formatDate(date, 'EEEE', 'pt-BR'); 
    const formattedDate = formatDate(date, 'dd/MM/yyyy', 'pt-BR'); 
    return `${dayName} ${formattedDate}`;
  }

  
  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(start.setDate(diff));
  }

  getEndOfWeek(date: Date): Date {
    const end = new Date(this.getStartOfWeek(date));
    end.setDate(end.getDate() + 6);
    return end;
  }

  nextWeek() {
    const nextWeekStart = new Date(this.startOfWeek);
    nextWeekStart.setDate(this.startOfWeek.getDate() + 7);
    this.setWeek(nextWeekStart);
    this.loadDisponibilidade(this.psychologist.id!); 
  }

  previousWeek() {
    const prevWeekStart = new Date(this.startOfWeek);
    prevWeekStart.setDate(this.startOfWeek.getDate() - 7);
    this.setWeek(prevWeekStart);
    this.loadDisponibilidade(this.psychologist.id!); 
  }

  openMyModal(content: any, hora: string, diaDaSemana: Date) {
    this.modalRef = this.modalService.open(content);
    this.horaSelecionada = hora;
    this.diaSelecionada = diaDaSemana;
  }

  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  async deletarDisponibilidade(){
    if (!this.horaSelecionada || !this.diaSelecionada) return;

    const availability: Availability = {
      data: this.diaSelecionada,
      horaIntervalo: this.horaSelecionada,
      psicologoId: this.psychologist.id
    };

    try {
      await this.availabilityDeleteService.delete(availability);
      this.toastrService.error('Disponibilidade deletada com sucesso.');
      this.loadPsychologist();


    } catch (error) {
      this.toastrService.error('Erro ao salvar a disponibilidade.');
      console.error(error);
    } finally {
      this.closeMyModal();
    }
  }

  async salvarDisponibilidade() {
    if (!this.horaSelecionada || !this.diaSelecionada) return;

    const availability: Availability = {
      data: this.diaSelecionada,
      horaIntervalo: this.horaSelecionada,
      psicologoId: this.psychologist.id
    };

    try {
      await this.availabilityCreateService.create(availability);
      this.toastrService.success('Disponibilidade salva com sucesso.');


    } catch (error) {
      this.toastrService.error('Erro ao salvar a disponibilidade.');
      console.error(error);
    } finally {
      this.closeMyModal();
    }
  }



addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

isAvailable(dia: Date, hora: string): boolean {
  return this.disponibilidades.some(
    (disponibilidade) =>
      this.sameDay(this.addDays(new Date(disponibilidade.data), 1), dia)
 &&
      disponibilidade.horaIntervalo === hora
  );
}

sameDay(d1: Date, d2: Date): boolean {
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
}


onAvailabilityClick(content: any, hora: string, dia: Date) {
  this.horaSelecionada = hora;
  this.diaSelecionada = dia;

  if(this.isConsultaMarcada(dia,hora)){
    this.toastrService.info("Ja tem consulta marcada neste horario")
  }else if (this.isAvailable(dia, hora)) {
    this.openMyModal(content, hora, dia);
  } else {

    this.toastrService.info("Horario não disponível")
  }
}

async marcarConsulta() {
  if (!this.horaSelecionada || !this.diaSelecionada) {
    this.toastrService.error('Por favor, selecione uma data e hora.');
    return;
  }

  try {
    const email = localStorage.getItem("email");
    const pessoa = await this.userReadService.findByEmail(email!);
    const pacienteId = pessoa.id;

    const disponibilidade = this.disponibilidades.find(
      (disponibilidade) =>
        this.sameDay(this.addDays(new Date(disponibilidade.data), 1), this.diaSelecionada) &&
        disponibilidade.horaIntervalo === this.horaSelecionada
    );

    if (!disponibilidade) {
      this.toastrService.error('Disponibilidade não encontrada.');
      return;
    }

    const agendamento: Agendamento = {
      disponibilidadeId: disponibilidade.id!,
      pacienteId: pacienteId!,
      dataAgendamento: this.diaSelecionada,
      status: 'Pendente'  
    };

    await this.consultationCreateService.create(agendamento);
    this.toastrService.success('Consulta marcada com sucesso!');
    this.closeMyModal();

  } catch (error) {
    this.toastrService.error('Erro ao marcar consulta.');
    console.error(error);
  }
}

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist']);
  }
}



