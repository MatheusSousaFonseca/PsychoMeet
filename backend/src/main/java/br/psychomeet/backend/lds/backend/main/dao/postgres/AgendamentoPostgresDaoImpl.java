package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.port.dao.agendamento.AgendamentoDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class AgendamentoPostgresDaoImpl implements AgendamentoDao {

    private static final Logger logger = Logger.getLogger(AgendamentoPostgresDaoImpl.class.getName());
    private final Connection connection;

    public AgendamentoPostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Agendamento entity) {
        String sql = "INSERT INTO agendamento (data, paciente_id, disponibilidade_id, hora_inicio, hora_fim, status) ";
        sql += "VALUES (?, ?, ?, ?, ?, ?);";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setDate(1, new Date(entity.getData().getTime()));
            preparedStatement.setInt(2, entity.getPacienteId());
            preparedStatement.setInt(3, entity.getDisponibilidadeId());
            preparedStatement.setTime(4, (Time) entity.getHoraInicio());
            preparedStatement.setTime(5, (Time) entity.getHoraFim());
            preparedStatement.setString(6, entity.getStatus());

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
        String sql = "DELETE FROM agendamento WHERE id = ?;";

        PreparedStatement preparedStatement = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql);
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
        } finally {
            try {
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
    }

    @Override
    public Agendamento readById(int id) {
        String sql = "SELECT * FROM agendamento WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        Agendamento agendamento = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                agendamento = new Agendamento();
                agendamento.setId(resultSet.getInt("id"));
                agendamento.setData(resultSet.getDate("data"));
                agendamento.setPacienteId(resultSet.getInt("paciente_id"));
                agendamento.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
                agendamento.setHoraInicio(resultSet.getTime("hora_inicio"));
                agendamento.setHoraFim(resultSet.getTime("hora_fim"));
                agendamento.setStatus(resultSet.getString("status"));
            }

        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }

        return agendamento;
    }

    @Override
    public List<Agendamento> readAll() {
        String sql = "SELECT * FROM agendamento;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        List<Agendamento> agendamentos = new ArrayList<>();

        try {
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Agendamento agendamento = new Agendamento();
                agendamento.setId(resultSet.getInt("id"));
                agendamento.setData(resultSet.getDate("data"));
                agendamento.setPacienteId(resultSet.getInt("paciente_id"));
                agendamento.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
                agendamento.setHoraInicio(resultSet.getTime("hora_inicio"));
                agendamento.setHoraFim(resultSet.getTime("hora_fim"));
                agendamento.setStatus(resultSet.getString("status"));

                agendamentos.add(agendamento);
            }

        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }

        return agendamentos;
    }

    @Override
    public void updateInformation(int id, Agendamento entity) {
        String sql = "UPDATE agendamento SET data = ?, paciente_id = ?, disponibilidade_id = ?, hora_inicio = ?, hora_fim = ?, status = ? WHERE id = ?;";

        PreparedStatement preparedStatement = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setDate(1, new Date(entity.getData().getTime()));
            preparedStatement.setInt(2, entity.getPacienteId());
            preparedStatement.setInt(3, entity.getDisponibilidadeId());
            preparedStatement.setTime(4, (Time) entity.getHoraInicio());
            preparedStatement.setTime(5, (Time) entity.getHoraFim());
            preparedStatement.setString(6, entity.getStatus());
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
        } finally {
            try {
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
    }
}
