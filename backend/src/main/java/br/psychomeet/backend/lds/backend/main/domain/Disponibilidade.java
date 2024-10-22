package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Disponibilidade {

    private int id;
    private int psicologoId;
    private Date data;
    private String horaIntervalo;
}
