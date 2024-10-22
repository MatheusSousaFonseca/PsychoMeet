package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade.DisponibilidadeDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class DisponibilidadePostgresDaoImpl implements DisponibilidadeDao {

    private static final Logger logger = Logger.getLogger(DisponibilidadePostgresDaoImpl.class.getName());
    private final Connection connection;

    public DisponibilidadePostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Disponibilidade entity) {
        String sql = "INSERT INTO disponibilidade (psicologo_id, data, hora_intervalo) VALUES (?, ?, ?);";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setInt(1, entity.getPsicologoId());
            preparedStatement.setDate(2, new java.sql.Date(entity.getData().getTime()));
            preparedStatement.setString(3, entity.getHoraIntervalo());

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
        String sql = "DELETE FROM disponibilidade WHERE id = ?;";

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
    public Disponibilidade readById(int id) {
        String sql = "SELECT * FROM disponibilidade WHERE id = ?;";
        Disponibilidade disponibilidade = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    disponibilidade = new Disponibilidade();
                    disponibilidade.setId(resultSet.getInt("id"));
                    disponibilidade.setPsicologoId(resultSet.getInt("profissional_id"));
                    disponibilidade.setData(resultSet.getDate("data_inicio"));
                    disponibilidade.setHoraIntervalo(resultSet.getString("hora_intervalo"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return disponibilidade;
    }

    @Override
    public List<Disponibilidade> readAll() {
        String sql = "SELECT * FROM disponibilidade;";
        List<Disponibilidade> disponibilidades = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Disponibilidade disponibilidade = new Disponibilidade();
                disponibilidade.setId(resultSet.getInt("id"));
                disponibilidade.setPsicologoId(resultSet.getInt("psicologo_id"));
                disponibilidade.setData(resultSet.getDate("data"));
                disponibilidade.setHoraIntervalo(resultSet.getString("hora_intervalo"));

                disponibilidades.add(disponibilidade);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return disponibilidades;
    }

    @Override
    public void updateInformation(int id, Disponibilidade entity) {
        String sql = "UPDATE disponibilidade SET profissional_id = ?, data_inicio = ?, data_fim = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);
            preparedStatement.setInt(1, entity.getPsicologoId());
            preparedStatement.setDate(2, new java.sql.Date(entity.getData().getTime()));
            preparedStatement.setString(3, entity.getHoraIntervalo());
            preparedStatement.setInt(4, id);

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
    public void removeByDate(Disponibilidade disponibilidade) {
        String sql = "DELETE FROM disponibilidade WHERE data = ? AND hora_intervalo = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);
            preparedStatement.setDate(1, new java.sql.Date(disponibilidade.getData().getTime()));
            preparedStatement.setString(2, disponibilidade.getHoraIntervalo());
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
    public List<Disponibilidade> getByPsicologo(int psicologo_id) {
        String sql = "SELECT * FROM disponibilidade WHERE psicologo_id = ?;";
        List<Disponibilidade> disponibilidades = new ArrayList<>();


        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, psicologo_id);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Disponibilidade disponibilidade = new Disponibilidade();
                disponibilidade.setId(resultSet.getInt("id"));
                disponibilidade.setPsicologoId(resultSet.getInt("psicologo_id"));
                disponibilidade.setData(resultSet.getDate("data"));
                disponibilidade.setHoraIntervalo(resultSet.getString("hora_intervalo"));

                disponibilidades.add(disponibilidade);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return disponibilidades;
    }
}
