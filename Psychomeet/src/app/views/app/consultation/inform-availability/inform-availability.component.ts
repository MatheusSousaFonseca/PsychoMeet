import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';
import { AvailabilityCreateService } from '../../../../services/availability/availability-create.service';
import { Psychologist } from '../../../../domain/model/psychologist-model';
import { Availability } from '../../../../domain/model/disponibilidade-psicologo-model';
import { CommonModule, formatDate , registerLocaleData } from '@angular/common';
import { FormGroup } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

@Component({
  selector: 'app-inform-availability',
  templateUrl: './inform-availability.component.html',
  styleUrls: ['./inform-availability.component.css'],
  standalone: true,
  imports: [CommonModule] // Importando CommonModule aqui
})
export class InformAvailabilityComponent implements OnInit {

  form!: FormGroup;
  modalRef: NgbModalRef | null = null;
  psychologist!: Psychologist;
  horaSelecionada!: string;
  diaSelecionada!: Date;
  horarioLista: { hora: string }[] = [];
  weekDays: Date[] = [];
  startOfWeek!: Date;
  endOfWeek!: Date;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private psychologistReadService: PsychologistReadService,
    private availabilityCreateService: AvailabilityCreateService,
    private toastrService: ToastrService
  ) {
    registerLocaleData(localePt, 'pt-BR');
   }

  ngOnInit(): void {
    this.initializeHorarios();

    // Set initial week to the current date's week
    this.setWeek(new Date());
  }

  // Inicializa os horários da tabela
  initializeHorarios() {
    for (let i = 8; i < 18; i++) {
      this.horarioLista.push({ hora: `${i}:00 - ${i + 1}:00` });
    }
  }

  // Define a semana com base em uma data (calculando segunda a domingo)
  setWeek(date: Date) {
    // Calcula o início e o fim da semana (segunda a domingo)
    this.startOfWeek = this.getStartOfWeek(date);
    this.endOfWeek = this.getEndOfWeek(date);

    // Cria uma lista com os dias da semana
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(this.startOfWeek);
      day.setDate(this.startOfWeek.getDate() + i);
      this.weekDays.push(day);
    }
  }

  // Função para exibir o dia da semana e a data no formato "Segunda-feira 21/10/2024"
  getDayWithDate(date: Date): string {
    const dayName = formatDate(date, 'EEEE', 'pt-BR'); // Nome do dia da semana
    const formattedDate = formatDate(date, 'dd/MM/yyyy', 'pt-BR'); // Data formatada
    return `${dayName} ${formattedDate}`;
  }

  // Calcula o início da semana (segunda-feira)
  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Ajusta para começar na segunda-feira
    return new Date(start.setDate(diff));
  }

  // Calcula o final da semana (domingo)
  getEndOfWeek(date: Date): Date {
    const end = new Date(this.getStartOfWeek(date));
    end.setDate(end.getDate() + 6);
    return end;
  }

  // Avança uma semana
  nextWeek() {
    const nextWeekStart = new Date(this.startOfWeek);
    nextWeekStart.setDate(this.startOfWeek.getDate() + 7);
    this.setWeek(nextWeekStart);
  }

  // Retrocede uma semana
  previousWeek() {
    const prevWeekStart = new Date(this.startOfWeek);
    prevWeekStart.setDate(this.startOfWeek.getDate() - 7);
    this.setWeek(prevWeekStart);
  }

  // Abre o modal para salvar a disponibilidade
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

  async salvarDisponibilidade() {
    if (!this.horaSelecionada || !this.diaSelecionada) return;

    const availability: Availability = {
      hora: this.horaSelecionada,
      diaDaSemana: this.diaSelecionada.toISOString(), // Save the date as ISO string
      //psicologoId: this.psychologist.id
    };

    try {
      const availabilityResponse = await this.availabilityCreateService.create(availability);

      if (availabilityResponse.id) {
        this.toastrService.success('Disponibilidade salva com sucesso.');
      } else {
        this.toastrService.error('Erro ao salvar a disponibilidade.');
      }

    } catch (error) {
      this.toastrService.error('Erro ao salvar a disponibilidade.');
      console.error(error);
    } finally {
      this.closeMyModal();
    }
  }

  voltar() {
    this.router.navigate(['consultation/view-consultation-psychologist']);
  }
}
