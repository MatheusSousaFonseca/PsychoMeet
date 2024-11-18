package br.psychomeet.backend.lds.backend.main.dto;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class PsicologoFullDTO {
    private String id;
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


    // Construtor vazio para uso padrão
    public PsicologoFullDTO() {
    }

    // Construtor com todos os campos
    public PsicologoFullDTO(String id, String nome, String email, String publico, String descricao, String crp, String cpf, List<String> abordagem, Date dataNascimento, double preco, List<String> especialidade, String senha, String telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.publico = publico;
        this.descricao = descricao;
        this.crp = crp;
        this.cpf = cpf;
        this.abordagens = abordagem;
        this.dataNascimento = dataNascimento;
        this.preco = preco;
        this.especialidades = especialidade;
        this.senha = senha;
        this.telefone = telefone;

    }

    // Método para retornar os dados de Pessoa
    public Pessoa getPessoa() {
        return new Pessoa(
                Integer.parseInt(this.id),  // Converte String para int
                this.telefone,
                this.nome,
                this.senha,
                this.dataNascimento,
                this.cpf,
                this.email,
                this.getRole()
        );
    }

    // Método para retornar os dados de Psicologo
    public Psicologo getPsicologo() {
        return new Psicologo(
                Integer.parseInt(this.id),  // Converte String para int
                Integer.parseInt(this.id),  // Aqui assumimos que o id da pessoa é o mesmo que o do psicólogo
                this.crp,
                this.descricao
        );
    }

    // Método para criar um PsicologoFullDTO a partir de Psicologo e Pessoa
    public static PsicologoFullDTO fromPsicologo(Psicologo psicologo, Pessoa pessoa) {
        return new PsicologoFullDTO(
                String.valueOf(psicologo.getId()),
                pessoa.getNome(),
                pessoa.getEmail(),
                "Público-alvo genérico",
                psicologo.getDescricao(),
                psicologo.getCrp(),
                pessoa.getCpf(),
                Collections.singletonList("Abordagem genérica"),
                pessoa.getDataNascimento(),
                150.0,
                Collections.singletonList("Especialidade genérica"),
                pessoa.getSenha(),
                pessoa.getTelefone()
        );
    }

    public PsicologoFullDTO(String id, String nome, String email, String publico, String descricao, String crp, String cpf, String abordagensStr, Date dataNascimento, double preco, String especialidadesStr, String senha, String telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.publico = publico;
        this.descricao = descricao;
        this.crp = crp;
        this.cpf = cpf;
        this.abordagens = Arrays.asList(abordagensStr.split(",\\s*")); // Split into List<String>
        this.dataNascimento = dataNascimento;
        this.preco = preco;
        this.especialidades = Arrays.asList(especialidadesStr.split(",\\s*")); // Split into List<String>
        this.senha = senha;
        this.telefone = telefone;
    }
}
