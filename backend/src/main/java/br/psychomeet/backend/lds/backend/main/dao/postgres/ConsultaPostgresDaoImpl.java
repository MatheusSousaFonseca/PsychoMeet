package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.port.dao.consulta.ConsultaDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class ConsultaPostgresDaoImpl implements ConsultaDao {

    private static final Logger logger = Logger.getLogger(ConsultaPostgresDaoImpl.class.getName());
    private final Connection connection;

    public ConsultaPostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Consulta entity) {
        String sql = "INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente) ";
        sql += "VALUES (?, ?, ?);";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setInt(1, entity.getAgendaId());
            preparedStatement.setInt(2, entity.getNotaPaciente());
            preparedStatement.setString(3, entity.getComentarioPaciente());

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
        String sql = "DELETE FROM consulta WHERE id = ?;";

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
    public Consulta readById(int id) {
        String sql = "SELECT * FROM consulta WHERE id = ?;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        Consulta consulta = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, id);

            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                consulta = new Consulta();
                consulta.setId(resultSet.getInt("id"));
                consulta.setAgendaId(resultSet.getInt("agenda_id"));
                consulta.setNotaPaciente(resultSet.getInt("nota_paciente"));
                consulta.setComentarioPaciente(resultSet.getString("comentario_paciente"));
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

        return consulta;
    }

    @Override
    public List<Consulta> readAll() {
        String sql = "SELECT * FROM consulta;";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        List<Consulta> consultas = new ArrayList<>();

        try {
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Consulta consulta = new Consulta();
                consulta.setId(resultSet.getInt("id"));
                consulta.setAgendaId(resultSet.getInt("agenda_id"));
                consulta.setNotaPaciente(resultSet.getInt("nota_paciente"));
                consulta.setComentarioPaciente(resultSet.getString("comentario_paciente"));

                consultas.add(consulta);
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

        return consultas;
    }

    @Override
    public void updateInformation(int id, Consulta entity) {
        String sql = "UPDATE consulta SET agenda_id = ?, nota_paciente = ?, comentario_paciente = ? WHERE id = ?;";

        PreparedStatement preparedStatement = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, entity.getAgendaId());
            preparedStatement.setInt(2, entity.getNotaPaciente());
            preparedStatement.setString(3, entity.getComentarioPaciente());
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
        } finally {
            try {
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
    }
}
