package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.dao.user.PessoaDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


public class PessoaPostgresDaoImpl implements PessoaDao {

    private static final Logger logger = Logger.getLogger(PessoaPostgresDaoImpl.class.getName());
    private final Connection connection;

    public PessoaPostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Pessoa entity) {
        String sqlPessoa = "INSERT INTO pessoa (nome, telefone, senha, cpf, email, data_nascimento, role) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id;";
        String sqlPaciente = "INSERT INTO paciente (pessoa_id) VALUES (?);"; // Novo SQL para inserir em paciente

        PreparedStatement preparedStatementPessoa = null;
        PreparedStatement preparedStatementPaciente = null; // PreparedStatement para paciente
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);

            // 1. Inserir na tabela pessoa
            preparedStatementPessoa = connection.prepareStatement(sqlPessoa, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatementPessoa.setString(1, entity.getNome());
            preparedStatementPessoa.setString(2, entity.getTelefone());
            preparedStatementPessoa.setString(3, entity.getSenha());
            preparedStatementPessoa.setString(4, entity.getCpf());
            preparedStatementPessoa.setString(5, entity.getEmail());
            preparedStatementPessoa.setDate(6, new Date(entity.getDataNascimento().getTime()));

            preparedStatementPessoa.execute();

            resultSet = preparedStatementPessoa.getGeneratedKeys();
            int pessoaId = 0;
            if (resultSet.next()) {
                pessoaId = resultSet.getInt(1); // Obter o ID gerado para pessoa
                entity.setId(pessoaId);
            }

            // 2. Inserir na tabela paciente
            preparedStatementPaciente = connection.prepareStatement(sqlPaciente);
            preparedStatementPaciente.setInt(1, pessoaId); // Usar o ID da pessoa
            preparedStatementPaciente.executeUpdate();

            connection.commit(); // Commit de todas as inserções

            return entity.getId();

        } catch (SQLException e) {
            try {
                connection.rollback(); // Rollback em caso de exceção
            } catch (SQLException ex) {
                logger.severe("Erro ao desfazer a transação: " + ex.getMessage());
                throw new RuntimeException(ex);
            }

            // Verificar se o erro é de chave única duplicada (ex: telefone ou e-mail)
            if (e.getSQLState().equals("23505")) { // Código SQLState para UNIQUE VIOLATION no Postgres
                if (e.getMessage().contains("pessoa_telefone_key")) {
                    throw new RuntimeException("Telefone já cadastrado!"); // Mensagem clara para o frontend
                } else if (e.getMessage().contains("pessoa_email_key")) {
                    throw new RuntimeException("E-mail já cadastrado!"); // Mensagem clara para o frontend
                } else if (e.getMessage().contains("pessoa_cpf_key")) {
                    throw new RuntimeException("CPF já cadastrado!"); // Mensagem clara para o frontend
                }
            }

            // Se o erro não for de chave duplicada, relançar exceção genérica
            logger.severe("Erro ao executar o método add: " + e.getMessage());
            throw new RuntimeException("Erro ao inserir pessoa: " + e.getMessage());
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatementPessoa != null) preparedStatementPessoa.close();
                if (preparedStatementPaciente != null) preparedStatementPaciente.close();
            } catch (SQLException e) {
                logger.severe("Erro ao fechar os recursos: " + e.getMessage());
            }
        }
    }


    @Override
    public void remove(int id) {
        String sql = "DELETE FROM pessoa WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
            connection.commit();

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing remove: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Pessoa readById(int id) {
        String sql = "SELECT * FROM pessoa WHERE id = ?;";
        Pessoa pessoa = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    pessoa = new Pessoa();
                    pessoa.setId(resultSet.getInt("id"));
                    pessoa.setNome(resultSet.getString("nome"));
                    pessoa.setTelefone(resultSet.getString("telefone"));
                    pessoa.setSenha(resultSet.getString("senha"));
                    pessoa.setCpf(resultSet.getString("cpf"));
                    pessoa.setEmail(resultSet.getString("email"));
                    pessoa.setDataNascimento(resultSet.getDate("data_nascimento"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return pessoa;
    }

    @Override
    public List<Pessoa> readAll() {
        String sql = "SELECT * FROM pessoa;";
        List<Pessoa> pessoas = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Pessoa pessoa = new Pessoa();
                pessoa.setId(resultSet.getInt("id"));
                pessoa.setNome(resultSet.getString("nome"));
                pessoa.setTelefone(resultSet.getString("telefone"));
                pessoa.setSenha(resultSet.getString("senha"));
                pessoa.setCpf(resultSet.getString("cpf"));
                pessoa.setEmail(resultSet.getString("email"));
                pessoa.setDataNascimento(resultSet.getDate("data_nascimento"));

                pessoas.add(pessoa);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return pessoas;
    }

    @Override
    public void updateInformation(int id, Pessoa entity) {
        String sql = "UPDATE pessoa SET nome = ?, telefone = ?, senha = ?, cpf = ?, email = ?, data_nascimento = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);

            preparedStatement.setString(1, entity.getNome());
            preparedStatement.setString(2, entity.getTelefone());
            preparedStatement.setString(3, entity.getSenha());
            preparedStatement.setString(4, entity.getCpf());
            preparedStatement.setString(5, entity.getEmail());
            preparedStatement.setDate(6, new Date(entity.getDataNascimento().getTime()));
            preparedStatement.setInt(7, id);

            preparedStatement.executeUpdate();
            connection.commit();

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing updateInformation: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Pessoa readByEmail(String email) {
        String sql = "SELECT * FROM pessoa WHERE email = ?;";
        Pessoa pessoa = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, email);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    pessoa = new Pessoa();
                    pessoa.setId(resultSet.getInt("id"));
                    pessoa.setNome(resultSet.getString("nome"));
                    pessoa.setTelefone(resultSet.getString("telefone"));
                    pessoa.setSenha(resultSet.getString("senha"));
                    pessoa.setCpf(resultSet.getString("cpf"));
                    pessoa.setEmail(resultSet.getString("email"));
                    pessoa.setDataNascimento(resultSet.getDate("data_nascimento"));
                    pessoa.setRole(Pessoa.UserRole.valueOf(resultSet.getString("role")));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readByEmail: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return pessoa;
    }



    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {
        return false;
    }
}
