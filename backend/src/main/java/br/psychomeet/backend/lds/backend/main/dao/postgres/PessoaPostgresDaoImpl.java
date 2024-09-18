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
        String sql = "INSERT INTO pessoa (nome, telefone, senha, cpf, email, data_nascimento) VALUES (?, ?, ?, ?, ?, ?);";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getNome());
            preparedStatement.setString(2, entity.getTelefone());
            preparedStatement.setString(3, entity.getSenha());
            preparedStatement.setString(4, entity.getCpf());
            preparedStatement.setString(5, entity.getEmail());
            preparedStatement.setDate(6, new Date(entity.getDataNascimento().getTime()));

            preparedStatement.execute();

            resultSet = preparedStatement.getGeneratedKeys();
            if (resultSet.next()) {
                final int id = resultSet.getInt(1);
                entity.setId(id);
            }

            connection.commit();

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing add: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
        return entity.getId();
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
        String sql = "UPDATE pessoa SET senha = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);

            preparedStatement.setString(1, newPassword);
            preparedStatement.setInt(2, id);

            int affectedRows = preparedStatement.executeUpdate();
            connection.commit();

            return affectedRows > 0;

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing updatePassword: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
