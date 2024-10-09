package br.psychomeet.backend.lds.backend.main.dto;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class PsicologoFullDTO {
    private String id;  // ID armazenado como String
    private String nome;
    private String email;
    private String publico;
    private String descricao;
    private String crp;
    private String cpf;
    private String abordagem;
    private Date dataNascimento;
    private double preco;
    private String especialidade;
    private String senha;
    private String telefone;

    // Construtor vazio para uso padrão
    public PsicologoFullDTO() {}

    // Construtor com todos os campos
    public PsicologoFullDTO(String id, String nome, String email, String publico, String descricao, String crp, String cpf, String abordagem, Date dataNascimento, double preco, String especialidade, String senha, String telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.publico = publico;
        this.descricao = descricao;
        this.crp = crp;
        this.cpf = cpf;
        this.abordagem = abordagem;
        this.dataNascimento = dataNascimento;
        this.preco = preco;
        this.especialidade = especialidade;
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
                this.email
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
                String.valueOf(psicologo.getId()),  // Converte int para String
                pessoa.getNome(),
                pessoa.getEmail(),
                "Público-alvo genérico",  // Você pode personalizar isso
                psicologo.getDescricao(),
                psicologo.getCrp(),
                pessoa.getCpf(),
                "Abordagem genérica",  // Você pode personalizar isso também
                pessoa.getDataNascimento(),
                150.0,  // Definir preço padrão ou personalizado
                "Especialidade genérica",  // Definir especialidade padrão ou personalizada
                pessoa.getSenha(),
                pessoa.getTelefone()
        );
    }
}