import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css']
})
export class MakeConsultationComponent implements OnInit {
  ngOnInit(): void {
    this.times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  }

  days: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  isModalOpen: boolean = true;
  helpRequested: boolean = false;
  selectedTime: string | null = null;
  selectedDay: string | null = null;

  openModal(time: string, day: string): void {
    this.selectedTime = time;
    this.selectedDay = day;
    this.isModalOpen = true;
    this.helpRequested = false;
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

  makeConsultation() {
    console.log(`Consulta marcada para ${this.selectedTime} na ${this.selectedDay}`);
    this.closeModal();
  }

  
}
