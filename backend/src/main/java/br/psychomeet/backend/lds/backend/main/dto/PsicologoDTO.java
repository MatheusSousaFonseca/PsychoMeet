package br.psychomeet.backend.lds.backend.main.dto;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PsicologoDTO extends Psicologo {
    private Psicologo psicologo;
    private Pessoa pessoa;
}

