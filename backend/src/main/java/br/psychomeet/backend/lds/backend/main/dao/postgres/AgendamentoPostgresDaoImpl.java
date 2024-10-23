package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
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
        String sql = "INSERT INTO agendamento (data_agendamento, paciente_id, disponibilidade_id, status) ";
        sql += "VALUES (?, ?, ?, ?);";

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setDate(1, new Date(entity.getDataAgendamento().getTime()));
            preparedStatement.setInt(2, entity.getPacienteId());
            preparedStatement.setInt(3, entity.getDisponibilidadeId());
            preparedStatement.setString(4, entity.getStatus());

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
                agendamento.setDataAgendamento(resultSet.getDate("data_agendamento"));
                agendamento.setPacienteId(resultSet.getInt("paciente_id"));
                agendamento.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
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
                agendamento.setDataAgendamento(resultSet.getDate("data_agendamento"));
                agendamento.setPacienteId(resultSet.getInt("paciente_id"));
                agendamento.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
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
        String sql = "UPDATE agendamento SET data_agendamento = ?, paciente_id = ?, disponibilidade_id = ?, status = ? WHERE id = ?;";

        PreparedStatement preparedStatement = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setDate(1, new Date(entity.getDataAgendamento().getTime()));
            preparedStatement.setInt(2, entity.getPacienteId());
            preparedStatement.setInt(3, entity.getDisponibilidadeId());
            preparedStatement.setString(4, entity.getStatus());
            preparedStatement.setInt(5, id);

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
    public List<AgendamentoDisponibilidadeDTO> readByPsicologo(int psicologoId, String status) {
        String sql = "SELECT a.id, a.paciente_id, a.disponibilidade_id, a.data_agendamento, " +
                "d.data, d.hora_intervalo, p.pessoa_id AS pessoa_id_psicologo, pac.pessoa_id AS pessoa_id_paciente " +
                "FROM agendamento a " +
                "JOIN disponibilidade d ON a.disponibilidade_id = d.id " +
                "JOIN psicologo p ON d.psicologo_id = p.id " +
                "JOIN paciente pac ON a.paciente_id = pac.id " +
                "WHERE d.psicologo_id = ?";

        if (status != null && !status.isEmpty()) {
            sql += " AND a.status = ?";
        }

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        List<AgendamentoDisponibilidadeDTO> agendamentos = new ArrayList<>();

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, psicologoId);

            if (status != null && !status.isEmpty()) {
                preparedStatement.setString(2, status);
            }

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                AgendamentoDisponibilidadeDTO dto = new AgendamentoDisponibilidadeDTO();
                dto.setId(resultSet.getInt("id"));
                dto.setPacienteId(resultSet.getInt("paciente_id"));
                dto.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
                dto.setDataAgendamento(resultSet.getDate("data_agendamento"));
                dto.setDataDisponibilidade(resultSet.getDate("data"));
                dto.setHoraIntervalo(resultSet.getString("hora_intervalo"));
                dto.setPessoaIdPsicologo(resultSet.getInt("pessoa_id_psicologo"));  // Inclui o pessoaId do psicólogo
                dto.setPessoaIdPaciente(resultSet.getInt("pessoa_id_paciente"));    // Inclui o pessoaId do paciente

                agendamentos.add(dto);
            }

        } catch (SQLException e) {
            logger.severe("Error executing readByPsicologo: " + e.getMessage());
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
    public List<Agendamento> readByPaciente(int pacienteId, String status) {
        String sql = "SELECT * FROM agendamento WHERE paciente_id = ?";

        if (status != null && !status.isEmpty()) {
            sql += " AND status = ?";
        }

        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        List<Agendamento> agendamentos = new ArrayList<>();

        try {
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, pacienteId);

            if (status != null && !status.isEmpty()) {
                preparedStatement.setString(2, status);
            }

            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Agendamento agendamento = new Agendamento();
                agendamento.setId(resultSet.getInt("id"));
                agendamento.setPacienteId(resultSet.getInt("paciente_id"));
                agendamento.setDisponibilidadeId(resultSet.getInt("disponibilidade_id"));
                agendamento.setDataAgendamento(resultSet.getDate("data_agendamento"));
                agendamento.setStatus(resultSet.getString("status"));
                agendamentos.add(agendamento);
            }

        } catch (SQLException e) {
            logger.severe("Error executing readByPaciente: " + e.getMessage());
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

    public void confirmarAgendamento(int agendamentoId) {
        String sqlConfirmar = "UPDATE agendamento SET status = 'Confirmado' WHERE id = ?";
        String sqlExcluirPendentes = "DELETE FROM agendamento WHERE disponibilidade_id = (SELECT disponibilidade_id FROM agendamento WHERE id = ?) AND id != ? AND status = 'pendente'";
        String sqlCriarConsulta = "INSERT INTO consulta (agenda_id, nota_paciente, comentario_paciente) VALUES (?, 0, '')";

        PreparedStatement preparedStatementConfirmar = null;
        PreparedStatement preparedStatementExcluirPendentes = null;
        PreparedStatement preparedStatementCriarConsulta = null;

        try {
            connection.setAutoCommit(false);

            // Confirmar o agendamento
            preparedStatementConfirmar = connection.prepareStatement(sqlConfirmar);
            preparedStatementConfirmar.setInt(1, agendamentoId);
            preparedStatementConfirmar.executeUpdate();

            // Excluir todos os agendamentos pendentes com a mesma disponibilidade_id
            preparedStatementExcluirPendentes = connection.prepareStatement(sqlExcluirPendentes);
            preparedStatementExcluirPendentes.setInt(1, agendamentoId);
            preparedStatementExcluirPendentes.setInt(2, agendamentoId);
            preparedStatementExcluirPendentes.executeUpdate();

            // Criar uma entrada na tabela consulta com nota_paciente e comentario_paciente vazios
            preparedStatementCriarConsulta = connection.prepareStatement(sqlCriarConsulta);
            preparedStatementCriarConsulta.setInt(1, agendamentoId);
            preparedStatementCriarConsulta.executeUpdate();

            connection.commit();

        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing confirmarAgendamento: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (preparedStatementConfirmar != null) preparedStatementConfirmar.close();
                if (preparedStatementExcluirPendentes != null) preparedStatementExcluirPendentes.close();
                if (preparedStatementCriarConsulta != null) preparedStatementCriarConsulta.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
    }


}