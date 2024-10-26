  export interface Consultation {
  consultaId: number;              // ID da consulta
  agendaId: number;                // ID do agendamento
  pacienteId: number;              // ID do paciente
  notaPaciente: number;            // Nota dada pelo paciente
  comentarioPaciente: string;      // Comentário do paciente
  status: string;                  // Status da consulta (confirmada ou pendente)
  data: string;                    // Data da consulta
  horaIntervalo: string;           // Intervalo de horas no formato "09:00-10:00"
  psicologoId: number;             // ID do psicólogo
  pessoaId: number;                // ID da pessoa (se necessário)
  nomePsicologo: string;           // Nome do psicólogo
  telefone: string;
}
