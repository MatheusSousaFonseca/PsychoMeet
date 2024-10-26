export interface Agendamento {
  disponibilidadeId: number;
  pacienteId: number;
  dataAgendamento: Date;
  status: string;
  id?: number;
}
