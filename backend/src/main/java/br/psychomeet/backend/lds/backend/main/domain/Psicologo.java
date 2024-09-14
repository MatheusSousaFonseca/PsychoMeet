package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Psicologo {

    private int id;
    private int pessoaId;
    private String crp;
    private String descricao;
}
