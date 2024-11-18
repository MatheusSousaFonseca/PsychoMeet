package br.psychomeet.backend.lds.backend.main.dto;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
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
        private List<String> abordagens;
        private Date dataNascimento;
        private double preco;
        private List<String> especialidades;
        private String senha;
        private String telefone;
        private Pessoa.UserRole role;

}
