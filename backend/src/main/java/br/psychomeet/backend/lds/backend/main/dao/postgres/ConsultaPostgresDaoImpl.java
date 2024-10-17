package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.dto.ConsultaAgendamentoDTO;
import br.psychomeet.backend.lds.backend.main.dto.FeedbackDTO;
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

    @Override
    public List<ConsultaAgendamentoDTO> findByPacienteId(int pacienteId, String status) {
        String sql = "SELECT c.id AS consulta_id, a.id AS agenda_id, a.paciente_id, c.nota_paciente, c.comentario_paciente, " +
                "a.status, a.data, a.hora_inicio, a.hora_fim, d.psicologo_id, p.id AS pessoa_id, pe.nome AS nome_psicologo " +
                "FROM consulta c " +
                "JOIN agendamento a ON c.agenda_id = a.id " +
                "JOIN disponibilidade d ON a.disponibilidade_id = d.id " +
                "JOIN psicologo p ON d.psicologo_id = p.id " +
                "JOIN pessoa pe ON p.pessoa_id = pe.id " +
                "WHERE a.paciente_id = ?";

        if (status != null) {
            sql += " AND a.status = ?"; // Adiciona o filtro de status
        }

        List<ConsultaAgendamentoDTO> consultasAgendamentos = new ArrayList<>();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, pacienteId);
            if (status != null) {
                preparedStatement.setString(2, status);
            }

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                ConsultaAgendamentoDTO dto = new ConsultaAgendamentoDTO();
                dto.setConsultaId(resultSet.getInt("consulta_id"));
                dto.setAgendaId(resultSet.getInt("agenda_id"));
                dto.setPacienteId(resultSet.getInt("paciente_id"));
                dto.setNotaPaciente(resultSet.getInt("nota_paciente"));
                dto.setComentarioPaciente(resultSet.getString("comentario_paciente"));
                dto.setStatus(resultSet.getString("status"));
                dto.setData(resultSet.getString("data"));
                dto.setHoraInicio(resultSet.getString("hora_inicio"));
                dto.setHoraFim(resultSet.getString("hora_fim"));
                dto.setPsicologoId(resultSet.getInt("psicologo_id")); // Adicionando psicologo_id
                dto.setPessoaId(resultSet.getInt("pessoa_id")); // Adicionando pessoa_id
                dto.setNomePsicologo(resultSet.getString("nome_psicologo")); // Adicionando nome do psicólogo

                consultasAgendamentos.add(dto);
            }

        } catch (SQLException e) {
            logger.severe("Error executing findByPacienteId: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }

        return consultasAgendamentos;
    }


    @Override
    public List<ConsultaAgendamentoDTO> findByPsicologoId(int psicologoId, String status) {
        String sql = "SELECT c.id AS consulta_id, a.id AS agenda_id, a.paciente_id, c.nota_paciente, c.comentario_paciente, " +
                "a.status, a.data, a.hora_inicio, a.hora_fim, d.psicologo_id " +
                "FROM consulta c " +
                "JOIN agendamento a ON c.agenda_id = a.id " +
                "JOIN disponibilidade d ON a.disponibilidade_id = d.id " +
                "WHERE a.psicologo_id = ?;";

        List<ConsultaAgendamentoDTO> consultasAgendamentos = new ArrayList<>();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, psicologoId);
            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                ConsultaAgendamentoDTO dto = new ConsultaAgendamentoDTO();
                dto.setConsultaId(resultSet.getInt("consulta_id"));
                dto.setAgendaId(resultSet.getInt("agenda_id"));
                dto.setPacienteId(resultSet.getInt("paciente_id"));
                dto.setNotaPaciente(resultSet.getInt("nota_paciente"));
                dto.setComentarioPaciente(resultSet.getString("comentario_paciente"));
                dto.setStatus(resultSet.getString("status"));
                dto.setData(resultSet.getString("data"));
                dto.setHoraInicio(resultSet.getString("hora_inicio"));
                dto.setHoraFim(resultSet.getString("hora_fim"));
                dto.setPsicologoId(psicologoId); // Adicionando psicologo_id

                consultasAgendamentos.add(dto);
            }

        } catch (SQLException e) {
            logger.severe("Error executing findByPsicologoId: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatement != null) preparedStatement.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }

        return consultasAgendamentos;
    }

    @Override
    public void giveFeedback(FeedbackDTO feedback) {
        String sql = "UPDATE consulta SET nota_paciente = ?, comentario_paciente = ? WHERE id = ?;";

        PreparedStatement preparedStatement = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, feedback.getNota());
            preparedStatement.setString(2, feedback.getAvaliacao());
            preparedStatement.setInt(3, feedback.getConsultaId());

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

