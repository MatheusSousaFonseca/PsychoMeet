package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PsicologoEspecialidade {
    private int id;
    private int psicologoId;
    private int especialidadeId;
}
