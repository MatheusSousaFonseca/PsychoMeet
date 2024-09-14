package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Dia {
    private int id;
    private int disponibilidadeId;
    private String turno;
    private String diaSemana;
    private String horaInicio;
    private String horaFim;
}
