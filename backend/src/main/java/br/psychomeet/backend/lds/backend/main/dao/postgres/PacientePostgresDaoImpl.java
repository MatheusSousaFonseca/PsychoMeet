package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class PacientePostgresDaoImpl implements PacienteDao {

    private static final Logger logger = Logger.getLogger(PacientePostgresDaoImpl.class.getName());
    private final Connection connection;

    public PacientePostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Paciente entity) {
        String sql = "INSERT INTO paciente (pessoa_id) VALUES (?);";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setInt(1, entity.getPessoaId());

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
        String sql = "DELETE FROM paciente WHERE id = ?;";

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
    public Paciente readById(int id) {
        String sql = "SELECT * FROM paciente WHERE id = ?;";
        Paciente paciente = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    paciente = new Paciente();
                    paciente.setId(resultSet.getInt("id"));
                    paciente.setPessoaId(resultSet.getInt("pessoa_id"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return paciente;
    }

    @Override
    public List<Paciente> readAll() {
        String sql = "SELECT * FROM paciente;";
        List<Paciente> pacientes = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Paciente paciente = new Paciente();
                paciente.setId(resultSet.getInt("id"));
                paciente.setPessoaId(resultSet.getInt("pessoa_id"));

                pacientes.add(paciente);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return pacientes;
    }

    @Override
    public void updateInformation(int id, Paciente entity) {
        String sql = "UPDATE paciente SET pessoa_id = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);
            preparedStatement.setInt(1, entity.getPessoaId());
            preparedStatement.setInt(2, id);

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
    public Paciente findByPessoa(int id) {
        String sql = "SELECT * FROM paciente WHERE pessoa_id = ?;";
        Paciente paciente = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    paciente = new Paciente();
                    paciente.setId(resultSet.getInt("id"));
                    paciente.setPessoaId(resultSet.getInt("pessoa_id"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return paciente;
    }
}

