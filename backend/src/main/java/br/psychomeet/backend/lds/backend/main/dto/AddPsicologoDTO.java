package br.psychomeet.backend.lds.backend.main.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AddPsicologoDTO {
        private int id; // Optional field
        private String nome;
        private String email;
        private String publico;
        private String descricao;
        private String crp;
        private String cpf;
        private String abordagem;
        private Date dataNascimento; // Use camelCase to follow Java conventions
        private double preco; // Use double for decimal values
        private List<String> especialidade; // List for multiple specialties
        private String senha;
        private String telefone;
}
