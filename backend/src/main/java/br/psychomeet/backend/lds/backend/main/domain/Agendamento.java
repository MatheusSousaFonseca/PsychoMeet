package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agendamento {

    private int id;
    private int pacienteId;
    private int disponibilidadeId;
    private Date dataAgendamento;
    private String status;
}
