package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Consulta {

    private int id;
    private int agendaId;
    private int notaPaciente;
    private String comentarioPaciente;
}
