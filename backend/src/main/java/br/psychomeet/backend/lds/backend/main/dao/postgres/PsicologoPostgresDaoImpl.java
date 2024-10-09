package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class PsicologoPostgresDaoImpl implements PsicologoDao {

    private static final Logger logger = Logger.getLogger(PsicologoPostgresDaoImpl.class.getName());
    private final Connection connection;

    public PsicologoPostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Psicologo entity) {
        String sql = "INSERT INTO psicologo (pessoa_id, crp, descricao) VALUES (?, ?, ?);";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setInt(1, entity.getPessoaId());
            preparedStatement.setString(2, entity.getCrp());
            preparedStatement.setString(3, entity.getDescricao());

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
        String sql = "DELETE FROM psicologo WHERE id = ?;";

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
    public PsicologoFullDTO readById(int id) {
        String sql = "SELECT p.id as pessoa_id, p.nome, p.email, p.cpf, p.data_nascimento, p.telefone, ps.id as psicologo_id, ps.crp, ps.descricao, e.descricao as especialidade, a.descricao as abordagem " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN especialidade e ON ps.id = e.psicologo_id " +
                "LEFT JOIN abordagem a ON ps.id = a.psicologo_id " +
                "WHERE ps.id = ?";

        PsicologoFullDTO psicologoFullDTO = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    psicologoFullDTO = new PsicologoFullDTO(
                            String.valueOf(resultSet.getInt("psicologo_id")),  // ID
                            resultSet.getString("nome"),                      // Nome
                            resultSet.getString("email"),                     // Email
                            "Público-alvo genérico",                          // Público (não especificado na query, ajuste conforme necessário)
                            resultSet.getString("descricao"),                 // Descrição
                            resultSet.getString("crp"),                       // CRP
                            resultSet.getString("cpf"),                       // CPF
                            resultSet.getString("abordagem"),                 // Abordagem
                            resultSet.getDate("data_nascimento"),             // Data de Nascimento
                            150.0,                                            // Preço (ajuste conforme necessário)
                            resultSet.getString("especialidade"),             // Especialidade
                            "senhaFake",                                      // Senha (substituir por senha real, se necessário)
                            resultSet.getString("telefone")                   // Telefone
                    );
                }
            }
        } catch (SQLException e) {
            logger.severe("Erro ao executar readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return psicologoFullDTO;
    }



    @Override
    public List<PsicologoFullDTO> readAll() {
        String sql = "SELECT ps.id AS psicologo_id, ps.crp, ps.descricao, p.id AS pessoa_id, p.nome, p.email, p.telefone, p.data_nascimento, p.cpf, " +
                "e.descricao AS especialidade, a.abordagem AS abordagem " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN psicologo_especialidade pe ON pe.psicologo_id = ps.id " +
                "LEFT JOIN especialidade e ON e.id = pe.especialidade_id " +
                "LEFT JOIN abordagem a ON a.psicologo_id = ps.id;";


        List<PsicologoFullDTO> psicologoFullDTOList = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                // Criando o objeto PsicologoFullDTO
                PsicologoFullDTO psicologoFullDTO = new PsicologoFullDTO(
                        String.valueOf(resultSet.getInt("psicologo_id")),  // ID
                        resultSet.getString("nome"),                      // Nome
                        resultSet.getString("email"),                     // Email
                        "Público-alvo genérico",                          // Público (substituir com a lógica correta se necessário)
                        resultSet.getString("descricao"),                 // Descrição
                        resultSet.getString("crp"),                       // CRP
                        resultSet.getString("cpf"),                       // CPF
                        resultSet.getString("abordagem"),                 // Abordagem (se houver)
                        resultSet.getDate("data_nascimento"),             // Data de Nascimento
                        150.0,                                            // Preço (valor estático ou ajuste conforme necessário)
                        resultSet.getString("especialidade"),             // Especialidade (se houver)
                        "senhaFake",                                      // Senha (valor estático ou ajuste conforme necessário)
                        resultSet.getString("telefone")                   // Telefone
                );

                // Adicionando à lista de PsicologoFullDTO
                psicologoFullDTOList.add(psicologoFullDTO);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return psicologoFullDTOList;
    }




    @Override
    public void updateInformation(int id, Psicologo entity) {
        String sql = "UPDATE psicologo SET crp = ?, descricao = ? WHERE id = ?;";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            connection.setAutoCommit(false);

            preparedStatement.setString(1, entity.getCrp());
            preparedStatement.setString(2, entity.getDescricao());
            preparedStatement.setInt(3, id);

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
