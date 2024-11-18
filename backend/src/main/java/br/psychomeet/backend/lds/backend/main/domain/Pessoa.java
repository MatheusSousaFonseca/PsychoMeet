package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Pessoa {
    private int id;
    private String telefone;
    private String nome;
    private String senha;
    private Date dataNascimento;
    private String cpf;
    private String email;
    private UserRole role;

    public enum UserRole{
        PSICOLOGO,
        PACIENTE,

    }
}

