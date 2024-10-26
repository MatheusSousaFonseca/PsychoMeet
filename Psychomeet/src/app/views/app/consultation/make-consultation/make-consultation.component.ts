import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from '../../../../domain/model/horario-model';
import { NgbModal, NgbModalRef, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
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
import { formatarData, formatarTelefone } from '../../../../services/utils/utils';
import { PacienteReadService } from '../../../../services/pacient/pacient-read-service';




@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgbRatingModule,
    NgbTooltipModule

  ]


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
  consultations: Consultation[] = [];

  pacientesMap: { [id: number]: string } = {}; // Map to store patient names

  // Variável para armazenar a média das notas
  mediaNotas: number = 0;



  constructor(
    private router: Router,
    private modalService: NgbModal,
    private psychologistReadService: PsychologistReadService,
    private availabilityReadService: AvailabilityReadService,
    private availabilityCreateService: AvailabilityCreateService,
    private availabilityDeleteService: AvailabilityDeleteService,
    private toastrService: ToastrService,
    private consultationCreateService: ConsultationCreateService,
    private consultationReadService: ConsultationReadService,
    private activatedRoute: ActivatedRoute,
    private userReadService: UserReadService,
    private pacienteReadService: PacienteReadService
  ) {
    registerLocaleData(localePt, 'pt-BR');
   }

  ngOnInit(): void {
    this.loadUsers();
    this.initializeHorarios();
    this.loadPsychologist();

    // Set initial week to the current date's week
    this.setWeek(new Date());
  }

  // Carregar dados do psicólogo com base no ID da URL
  async loadPsychologist() {
    const psychologistId = this.activatedRoute.snapshot.paramMap.get('id'); // Obter o ID da rota
    if (psychologistId) {
      this.psychologist = await this.psychologistReadService.findById(psychologistId);
      this.loadDisponibilidade(this.psychologist.id!);
      this.loadConsultations()
      this.loadConsultasMarcadas(this.psychologist.id!)
    }
  }

  // Carregar as disponibilidades do psicólogo
  async loadDisponibilidade(psychologistId: number) {
    this.disponibilidades = await this.availabilityReadService.findByPsicologo(psychologistId);
  }

  async loadConsultasMarcadas(psychologistId: number) {
    this.consultasMarcadas = await this.consultationReadService.findByIdPsicologoAccept(psychologistId);

    this.calcularMediaNotas();
  }

  isConsultaMarcada(dia: Date, hora: string): boolean {
    return this.consultasMarcadas.some(
      (consulta) =>
        this.sameDay(this.addDays(new Date(consulta.data), 1), dia) &&
        consulta.horaIntervalo === hora
    );
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
  this.loadDisponibilidade(this.psychologist.id!); // Recarregar disponibilidades da semana
}

// Retrocede uma semana
previousWeek() {
  const prevWeekStart = new Date(this.startOfWeek);
  prevWeekStart.setDate(this.startOfWeek.getDate() - 7);
  this.setWeek(prevWeekStart);
  this.loadDisponibilidade(this.psychologist.id!); // Recarregar disponibilidades da semana
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



// Função auxiliar para adicionar um dia à data
addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

isAvailable(dia: Date, hora: string): boolean {
  const today = new Date();
  today.setDate(today.getDate() - 1)
  // Se o dia for anterior à data de hoje, ele é tratado como indisponível
  if (dia < today) {
    return false;
  }

  return this.disponibilidades.some(
    (disponibilidade) =>
      this.sameDay(this.addDays(new Date(disponibilidade.data), 1), dia) &&
      disponibilidade.horaIntervalo === hora
  );
}



// Função auxiliar para comparar se duas datas estão no mesmo dia (desconsiderando horas, minutos)
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
    // Obter o ID do paciente logado
    const email = localStorage.getItem("email");
    const pessoa = await this.userReadService.findByEmail(email!);
    console.log("PessoaId" , pessoa.id)
    const paciente = await this.pacienteReadService.findByPessoaId(pessoa.id!);
    console.log("Paciente" , paciente)
    // Encontre a disponibilidade selecionada com base no dia e hora
    const disponibilidade = this.disponibilidades.find(
      (disponibilidade) =>
        this.sameDay(this.addDays(new Date(disponibilidade.data), 1), this.diaSelecionada) &&
        disponibilidade.horaIntervalo === this.horaSelecionada
    );
    if (!disponibilidade) {
      this.toastrService.error('Disponibilidade não encontrada.');
      return;
    }

    // Crie o objeto de Agendamento
    const agendamento: Agendamento = {
      disponibilidadeId: disponibilidade.id!,
      pacienteId: paciente.id!,
      dataAgendamento: this.diaSelecionada,
      status: 'Pendente'  // Status inicial da consulta
    };

    // Chame o serviço para criar a consulta
    await this.consultationCreateService.create(agendamento);
    this.toastrService.success('Pedido de consulta enviado com sucesso!');
    this.closeMyModal();

  } catch (error) {
    this.toastrService.error('Erro ao marcar consulta.');
    console.error(error);
  }
}

// Load patient names for consultations
async preloadPacientesNames() {
  const pacienteIds = this.consultations.map(c => c.pessoaId);
  for (const id of pacienteIds) {
    if (!this.pacientesMap[id]) {
      const paciente = await this.userReadService.findById(id);
      if (paciente) {
        this.pacientesMap[id] = paciente.nome;
      }
    }
  }
}

// trackBy function to optimize ngFor rendering
trackById(index: number, item: Consultation) {
  return item.consultaId; // Assuming consultation has a unique id
}


// Load consultations and preload patient names
async loadConsultations() {

    if (this.psychologist?.id) {
      this.consultations = await this.consultationReadService.findByIdPsicologoAccept(this.psychologist.id);
      await this.preloadPacientesNames(); // Ensure patient names are preloaded
      console.log("LOAD CONSULTATIONS 2222", this.consultations);
      }
}

async loadUsers() {
  const users = await this.userReadService.findAll();

  users.forEach(user => {
    if (user?.id) {
      this.pacientesMap[user.id] = user.nome;
    }
  });



}

hasFeedback(feedback: string, nota: number){
  return feedback != "" && nota != 0
}



  voltar() {
    this.router.navigate(['consultation/search-psychologist']);
  }


  formatarData(date: string){
    return formatarData(date);
  }

  formatarTelefone(phone : string){
    return formatarTelefone(phone)
  }

  // Método para calcular a média das notas
  calcularMediaNotas() {
    let somaNotas = 0;
    let totalNotas = 0;

    // Percorre as consultas para somar as notas válidas
    this.consultations.forEach((consulta) => {
      if (consulta.notaPaciente && consulta.notaPaciente > 0) {
        somaNotas += consulta.notaPaciente;
        totalNotas++;
      }
    });

    // Calcula a média se houverem notas
    if (totalNotas > 0) {
      this.mediaNotas = somaNotas / totalNotas;
    } else {
      this.mediaNotas = 0; // Se não houverem notas, define a média como 0
    }
    console.log(this.mediaNotas)
  }

  ariaValueText(current: number, max: number) {
		return `${current} out of ${max} hearts`;
	}
}






