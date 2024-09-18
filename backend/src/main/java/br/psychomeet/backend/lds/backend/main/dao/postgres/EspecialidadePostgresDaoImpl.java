package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Especialidade;
import br.psychomeet.backend.lds.backend.main.port.dao.especialidade.EspecialidadeDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class EspecialidadePostgresDaoImpl implements EspecialidadeDao {

    private static final Logger logger = Logger.getLogger(EspecialidadePostgresDaoImpl.class.getName());
    private final Connection connection;

    public EspecialidadePostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Especialidade entity) {
        String sql = "INSERT INTO especialidade (descricao) VALUES (?);";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getDescricao());

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
        String sql = "DELETE FROM especialidade WHERE id = ?;";

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
    public Especialidade readById(int id) {
        String sql = "SELECT * FROM especialidade WHERE id = ?;";
        Especialidade especialidade = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    especialidade = new Especialidade();
                    especialidade.setId(resultSet.getInt("id"));
                    especialidade.setDescricao(resultSet.getString("descricao"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return especialidade;
    }

    @Override
    public List<Especialidade> readAll() {
        String sql = "SELECT * FROM especialidade;";
        List<Especialidade> especialidades = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Especialidade especialidade = new Especialidade();
                especialidade.setId(resultSet.getInt("id"));
                especialidade.setDescricao(resultSet.getString("descricao"));

                especialidades.add(especialidade);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return especialidades;
    }

    @Override
    public void updateInformation(int id, Especialidade entity) {
        String sql = "UPDATE especialidade SET descricao = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);
            preparedStatement.setString(1, entity.getDescricao());
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
}
