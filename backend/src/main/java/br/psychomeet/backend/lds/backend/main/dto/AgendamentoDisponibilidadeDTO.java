package br.psychomeet.backend.lds.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoDisponibilidadeDTO {

    private int id;                    // ID do agendamento
    private int pacienteId;             // ID do paciente
    private int disponibilidadeId;      // ID da disponibilidade
    private Date dataAgendamento;       // Data de agendamento
    private Date dataDisponibilidade;   // Data da disponibilidade
    private String horaIntervalo;       // Intervalo de horas no formato "09:00-10:00"
    private int pessoaIdPsicologo;      // ID da pessoa associada ao psicólogo
    private int pessoaIdPaciente;       // ID da pessoa associada ao paciente
}

