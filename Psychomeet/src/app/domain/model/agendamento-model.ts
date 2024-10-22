export interface AgendamentoDisponibilidade {
    consultaId: number;              // ID da consulta
    agendaId: number;                // ID do agendamento
    pacienteId: number;              // ID do paciente
    pessoaIdPaciente: number;        // ID da pessoa associada ao paciente
    notaPaciente: number;            // Nota dada pelo paciente
    comentarioPaciente: string;      // Comentário do paciente
    status: string;                  // Status da consulta (confirmada ou pendente)
    dataDisponibilidade: string;     // Data da consulta (formato de string ISO)
    horaIntervalo: string;           // Intervalo de horas no formato "09:00-10:00"
    psicologoId: number;             // ID do psicólogo
    pessoaIdPsicologo: number;       // ID da pessoa associada ao psicólogo
    nomePsicologo: string;           // Nome do psicólogo
    id?: number;
  }