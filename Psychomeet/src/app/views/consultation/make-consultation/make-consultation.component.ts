import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Horario } from '../../../domain/model/horario-model';

@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css']
})
export class MakeConsultationComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    for (let i = 8; i < 18; i++) {

      let horarios: Horario = {
        hora: `${i}:00 - ${i + 1}:00`,
        segunda: "Segunda-feira",
        terca: "Terça-feira",
        quarta: "Quarta-feira",
        quinta: "Quinta-feira",
        sexta: "Segunda-feira",
        sabado: "Sabado",
        domingo: "Segunda-feira",
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

  openModal(time: string, day: string): void {
    this.router.navigate(['pop-ups/pop-up-make-consultation']);

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



