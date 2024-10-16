package br.psychomeet.backend.lds.backend.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private int consultaId;
    private String avaliacao;
    private int nota;
}

