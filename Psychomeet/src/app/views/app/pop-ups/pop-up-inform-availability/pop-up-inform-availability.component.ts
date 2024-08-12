import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Horario } from '../../../../domain/model/horario-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-inform-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-inform-availability.component.html',
  styleUrl: './pop-up-inform-availability.component.css'
})
export class PopUpInformAvailabilityComponent {

  constructor(private router : Router){}

  confirmarDisponibilidade(){
    this.router.navigate(['consultation/inform-availability'])

  }

}