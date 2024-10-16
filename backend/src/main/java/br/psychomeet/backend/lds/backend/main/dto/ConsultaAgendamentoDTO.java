package br.psychomeet.backend.lds.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultaAgendamentoDTO {
    private int consultaId;               // ID da consulta
    private int agendaId;                 // ID do agendamento
    private int pacienteId;               // ID do paciente
    private int notaPaciente;             // Nota dada pelo paciente
    private String comentarioPaciente;     // Comentário do paciente
    private String status;                 // Status da consulta (por exemplo: "Confirmada", "Pendente")
    private String data;                   // Data do agendamento
    private String horaInicio;             // Hora de início do agendamento
    private String horaFim;                // Hora de fim do agendamento
    private int psicologoId;               // ID do psicólogo associado ao agendamento
    private int pessoaId;                  // ID da pessoa associada ao psicólogo
    private String nomePsicologo;          // Nome do psicólogo
}
