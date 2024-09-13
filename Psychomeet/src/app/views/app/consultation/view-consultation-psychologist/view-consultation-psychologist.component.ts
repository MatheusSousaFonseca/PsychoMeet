import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/model/user-model';
import { UserReadService } from '../../../../services/user/user-read-service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { PsychologistReadService } from '../../../../services/psychologist/psychologist-read.service';

@Component({
  selector: 'app-view-consultation-psychologist',
  standalone: true,
  imports: [],
  templateUrl: './view-consultation-psychologist.component.html',
  styleUrl: './view-consultation-psychologist.component.css'
})
export class ViewConsultationPsychologistComponent {

  users: User[] = [];

  consultations: Consultation[] = [];

  constructor(private router: Router, private userReadService: UserReadService, private consultationReadService: ConsultationReadService, private psychologistReadService: PsychologistReadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadConsultations();
  }

  consultasPendentes() {
    this.router.navigate(['consultation/view-request-consultation']);
  }

  agenda() {
    this.router.navigate(['consultation/inform-availability']);
  }

  async loadUsers() {
    this.users = await this.userReadService.findAll();
  }

  async loadConsultations() {
    let email = localStorage.getItem("email")
    let psychologist = await this.psychologistReadService.findByEmail(email!)
    console.log(psychologist)
    this.consultations = await this.consultationReadService.findByIdPsicologoAccept(psychologist[0].id!);
  }

  getUserName(id: string){
    return this.users.find((user)=>{
      return user.id===id
    })?.nome
    
  }

  acessarPerfilPsicologo() {
    this.router.navigate(['account/my-profile-psichologist'])
  }

  salvar() {
    this.router.navigate(['account/my-profile-psichologist']);

  }

  voltar() {
    this.router.navigate(['account/my-profile-psichologist']);
  }

  logout() {
    this.router.navigate(['app/home'])
  }


}
