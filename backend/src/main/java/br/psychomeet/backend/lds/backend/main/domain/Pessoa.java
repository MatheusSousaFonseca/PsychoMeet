package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    private byte[] foto; // Adicionado o campo para armazenar a foto

    public enum UserRole{
        PSICOLOGO,
        PACIENTE,

    }

    public Pessoa(int id, String telefone, String nome, String senha, Date dataNascimento, String cpf, String email, UserRole role) {
        this.id = id;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.role = role;
    }
}

