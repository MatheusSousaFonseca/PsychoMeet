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
import { UserReadService } from '../../../../services/user/user-read-service';
import { AvailabilityReadService } from '../../../../services/availability/availability-read.service';
import { AvailabilityDeleteService } from '../../../../services/availability/availability-delete.service';
import { Consultation } from '../../../../domain/model/consultation-model';
import { ConsultationReadService } from '../../../../services/consultation/consultation-read-service';
import { ConsultationDeleteService } from '../../../../services/consultation/consultation-delete-service';

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

disponibilidades: Availability[] = [];
consultas: Consultation[] = [];

pacientesMap: { [id: number]: string } = {}; // Map to store patient names

  // Nova propriedade para armazenar a consulta selecionada
consultaSelecionada: Consultation | null | undefined;

constructor(
private router: Router,
private modalService: NgbModal,
private psychologistReadService: PsychologistReadService,
private availabilityReadService: AvailabilityReadService,
private availabilityCreateService: AvailabilityCreateService,
private availabilityDeleteService: AvailabilityDeleteService,
private toastrService: ToastrService,
private consultationReadService: ConsultationReadService,
private userReadService: UserReadService,
private consultationDeleteService: ConsultationDeleteService
) {
registerLocaleData(localePt, 'pt-BR');
}

ngOnInit(): void {
console.log("INICIALIZAÇÂO : ", this.pacientesMap)
this.initializeHorarios();
this.loadDisponibilidade();


// Set initial week to the current date's week
    this.setWeek(new Date());
}


//Adicionando Disponibilidade
  async loadDisponibilidade() {
let email = localStorage.getItem("email");
this.psychologist = await this.psychologistReadService.findByEmail(email!);
this.disponibilidades = await this.availabilityReadService.findByPsicologo(this.psychologist.id!);
console.log(this.disponibilidades)
this.loadConsultasMarcadas(this.psychologist.id!);
}

async loadConsultasMarcadas(psychologistId: number) {
this.consultas = await this.consultationReadService.findByIdPsicologoAccept(psychologistId);
await this.preloadPacientesNames(); // Ensure patient names are preloaded
  }

// Load patient names for consultations
  async preloadPacientesNames() {
const pacienteIds = this.consultas.map(c => c.pacienteId);
for (const id of pacienteIds) {
if (!this.pacientesMap[id]) {
const paciente = await this.userReadService.findById(id);
if (paciente) {
this.pacientesMap[id] = paciente.nome;
}
}
}
}

isConsultaMarcada(dia: Date, hora: string): boolean {
return this.consultas.some(
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
this.loadDisponibilidade();


} catch (error) {
this.toastrService.error('Erro ao salvar a disponibilidade.');
console.error(error);
} finally {
this.closeMyModal();
}
}

async salvarDisponibilidade(hora: string, dia: Date) {
if (!this.horaSelecionada || !this.diaSelecionada) return;

const availability: Availability = {
data: this.diaSelecionada,
horaIntervalo: this.horaSelecionada,
psicologoId: this.psychologist.id
};

try {
await this.availabilityCreateService.create(availability);
this.toastrService.success('Disponibilidade salva com sucesso.');
this.loadDisponibilidade();


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

// Verifica se o psicólogo já informou disponibilidade para uma data e hora específica
isAvailable(dia: Date, hora: string): boolean {
return this.disponibilidades.some(
(disponibilidade) =>
this.sameDay(this.addDays(new Date(disponibilidade.data), 1), dia) &&
disponibilidade.horaIntervalo === hora
);
}

// Função auxiliar para verificar se duas datas têm o mesmo dia, mês e ano
sameDay(d1: Date, d2: Date): boolean {
return d1.getDate() === d2.getDate() &&
d1.getMonth() === d2.getMonth() &&
d1.getFullYear() === d2.getFullYear();
}

// Modifica o onAvailabilityClick para abrir o modal correto
onAvailabilityClick(content: any, hora: string, dia: Date) {
this.horaSelecionada = hora;
this.diaSelecionada = dia;

// Verifica se já existe uma consulta marcada
  if (this.isConsultaMarcada(dia, hora)) {
this.consultaSelecionada = this.consultas.find(
(consulta) =>
this.sameDay(this.addDays(new Date(consulta.data), 1), dia) &&
consulta.horaIntervalo === hora
);
this.openConsultaModal(content); // Abre o modal com os detalhes da consulta
  } else if (this.isAvailable(dia, hora)) {
// Se já existe disponibilidade, deleta
    this.deletarDisponibilidade();
} else {
// Se não existe, abre o modal para adicionar
    this.salvarDisponibilidade( hora, dia);
}
}

// Função para abrir o modal de consulta
openConsultaModal(content: any) {
this.modalRef = this.modalService.open(content);
}

async cancelarConsulta(){
try{
await this.consultationDeleteService.cancelarConsulta(this.consultaSelecionada?.consultaId!);
this.toastrService.success('Consulta Cancelada Com Sucesso!');
this.loadDisponibilidade();
}
catch (error) {
this.toastrService.error('Erro ao cancelar consulta.');
console.error(error);
} finally {
this.closeMyModal();
}
}



voltar() {
this.router.navigate(['consultation/view-consultation-psychologist']);
}
}
