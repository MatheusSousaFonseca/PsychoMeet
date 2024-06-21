import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-request-consultation',
  standalone: true,
  imports: [],
  templateUrl: './view-request-consultation.component.html',
  styleUrl: './view-request-consultation.component.css'
})
export class ViewRequestConsultationComponent {

  constructor(private router: Router) { }

  // consultas = [
  //   { paciente: 'João Silva', data: '24/06/2024', hora: '16:00', descricao: 'Consulta de rotina' },
  //   { paciente: 'Maria Oliveira', data: '25/06/2024', hora: '14:30', descricao: 'Sessão de terapia' },
  //   { paciente: 'Carlos Souza', data: '26/06/2024', hora: '10:00', descricao: 'Consulta de acompanhamento' }
  // ];

  aceitarConsulta() {
    this.router.navigate(['pop-ups/pop-up-accept-consultation']);


  }

  recusarConsulta() {
    this.router.navigate(['pop-ups/pop-up-refuse-consultation']);

  }

  vizualizarConsulta() {
    this.router.navigate(['consultation/view-consultation-psychologist']);

  }

}
