package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;
import br.psychomeet.backend.lds.backend.main.port.service.especialidade.EspecialidadeService;
import org.springframework.beans.factory.annotation.Autowired;

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

    @Autowired
    private EspecialidadeService especialidadeService;

    public PsicologoPostgresDaoImpl(Connection connection) {
        this.connection = connection;
    }


    @Override
    public int add(AddPsicologoDTO entity) {
        String sqlPessoa = "INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email) VALUES (?, ?, ?, ?, ?, ?) RETURNING id;";
        String sqlPsicologo = "INSERT INTO psicologo (pessoa_id, crp, descricao) VALUES (?, ?, ?) RETURNING id;";
        String sqlEspecialidade = "INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id) VALUES (?, ?);";

        PreparedStatement preparedStatementPessoa = null;
        PreparedStatement preparedStatementPsicologo = null;
        PreparedStatement preparedStatementEspecialidade = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);

            // 1. Insert into pessoa
            preparedStatementPessoa = connection.prepareStatement(sqlPessoa);
            preparedStatementPessoa.setString(1, entity.getTelefone());
            preparedStatementPessoa.setString(2, entity.getNome());
            preparedStatementPessoa.setString(3, entity.getSenha());
            preparedStatementPessoa.setDate(4, new java.sql.Date(entity.getDataNascimento().getTime()));
            preparedStatementPessoa.setString(5, entity.getCpf());
            preparedStatementPessoa.setString(6, entity.getEmail());

            resultSet = preparedStatementPessoa.executeQuery();
            int pessoaId = 0;
            if (resultSet.next()) {
                pessoaId = resultSet.getInt(1); // Get the generated ID for pessoa
            }

            // 2. Insert into psicologo
            preparedStatementPsicologo = connection.prepareStatement(sqlPsicologo);
            preparedStatementPsicologo.setInt(1, pessoaId);
            preparedStatementPsicologo.setString(2, entity.getCrp());
            preparedStatementPsicologo.setString(3, entity.getDescricao());

            resultSet = preparedStatementPsicologo.executeQuery();
            int psicologoId = 0;
            if (resultSet.next()) {
                psicologoId = resultSet.getInt(1); // Get the generated ID for psicologo
            }

            // 3. Insert into psicologo_especialidade for each specialty
            System.out.println("DEBUG");
            System.out.println(entity.getEspecialidade());
            for (String especialidade : entity.getEspecialidade()) {
                System.out.println(especialidade);
                // Assume you have a method to get the id of the specialty
                int especialidadeId = especialidadeService.getIdByName(especialidade);
                if (especialidadeId != -1) { // Only insert if specialty ID is valid
                    preparedStatementEspecialidade = connection.prepareStatement(sqlEspecialidade);
                    preparedStatementEspecialidade.setInt(1, psicologoId);
                    preparedStatementEspecialidade.setInt(2, especialidadeId);
                    preparedStatementEspecialidade.executeUpdate();
                }
            }

            connection.commit(); // Commit all the inserts
            return psicologoId; // Return the ID of the newly created psychologist

        } catch (SQLException e) {
            try {
                connection.rollback(); // Roll back if any exception occurs
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing add: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatementPessoa != null) preparedStatementPessoa.close();
                if (preparedStatementPsicologo != null) preparedStatementPsicologo.close();
                if (preparedStatementEspecialidade != null) preparedStatementEspecialidade.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
        }
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
        String sql = "SELECT ps.id AS psicologo_id, ps.crp, ps.descricao, p.id AS pessoa_id, p.nome, p.email, p.telefone, p.data_nascimento, p.cpf, " +
                "STRING_AGG(DISTINCT e.descricao, ', ') AS especialidades, " +
                "STRING_AGG(DISTINCT a.abordagem, ', ') AS abordagens " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN psicologo_especialidade pe ON pe.psicologo_id = ps.id " +
                "LEFT JOIN especialidade e ON e.id = pe.especialidade_id " +
                "LEFT JOIN abordagem a ON a.psicologo_id = ps.id " +
                "WHERE ps.id = ? " +
                "GROUP BY ps.id, p.id;";

        PsicologoFullDTO psicologoFullDTO = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    psicologoFullDTO = new PsicologoFullDTO(
                            String.valueOf(resultSet.getInt("psicologo_id")),  // ID
                            resultSet.getString("nome"),                        // Nome
                            resultSet.getString("email"),                       // Email
                            "Público-alvo genérico",                            // Público
                            resultSet.getString("descricao"),                   // Descrição
                            resultSet.getString("crp"),                         // CRP
                            resultSet.getString("cpf"),                         // CPF
                            resultSet.getString("abordagens"),                 // Get the concatenated string of approaches
                            resultSet.getDate("data_nascimento"),               // Data de Nascimento
                            150.0,                                              // Preço
                            resultSet.getString("especialidades"),             // Get the concatenated string of specialties
                            "senhaFake",                                        // Senha
                            resultSet.getString("telefone")                     // Telefone
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
        String sql = "SELECT ps.id AS psicologo_id, ps.crp, ps.descricao, p.id AS pessoa_id, " +
                "p.nome, p.email, p.telefone, p.data_nascimento, p.cpf, " +
                "STRING_AGG(DISTINCT e.descricao, ', ') AS especialidades, " +
                "STRING_AGG(DISTINCT a.abordagem, ', ') AS abordagens " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN psicologo_especialidade pe ON pe.psicologo_id = ps.id " +
                "LEFT JOIN especialidade e ON e.id = pe.especialidade_id " +
                "LEFT JOIN abordagem a ON a.psicologo_id = ps.id " +
                "GROUP BY ps.id, p.id;";


        List<PsicologoFullDTO> psicologoFullDTOList = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                System.out.println(resultSet.getString("abordagens"));
                // Criando o objeto PsicologoFullDTO
                PsicologoFullDTO psicologoFullDTO = new PsicologoFullDTO(
                        String.valueOf(resultSet.getInt("psicologo_id")),
                        resultSet.getString("nome"),
                        resultSet.getString("email"),
                        "Público-alvo genérico",
                        resultSet.getString("descricao"),
                        resultSet.getString("crp"),
                        resultSet.getString("cpf"),
                        resultSet.getString("abordagens"), // Get the concatenated string of approaches
                        resultSet.getDate("data_nascimento"),
                        150.0,
                        resultSet.getString("especialidades"), // Get the concatenated string of specialties
                        "senhaFake",
                        resultSet.getString("telefone")                   // Telefone
                );

                // Adicionando à lista de PsicologoFullDTO
                psicologoFullDTOList.add(psicologoFullDTO);
            }
        } catch (SQLException e) {
            logger.severe("Error executing findAll: " + e.getMessage());
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

    @Override
    public List<PsicologoFullDTO> search(String name, String especialidade) {
        StringBuilder sql = new StringBuilder("SELECT ps.id AS psicologo_id, ps.crp, ps.descricao, p.id AS pessoa_id, " +
                "p.nome, p.email, p.telefone, p.data_nascimento, p.cpf, " +
                "STRING_AGG(DISTINCT e.descricao, ', ') AS especialidades, " +
                "STRING_AGG(DISTINCT a.abordagem, ', ') AS abordagens " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN psicologo_especialidade pe ON pe.psicologo_id = ps.id " +
                "LEFT JOIN especialidade e ON e.id = pe.especialidade_id " +
                "LEFT JOIN abordagem a ON a.psicologo_id = ps.id WHERE 1=1 "); // Always true condition

        // List to store parameters
        List<String> parameters = new ArrayList<>();

        if (name != null && !name.isEmpty()) {
            sql.append("AND p.nome ILIKE ? ");
            parameters.add("%" + name + "%");
        }

        if (especialidade != null && !especialidade.isEmpty()) {
            sql.append("AND e.descricao ILIKE ? ");
            parameters.add("%" + especialidade + "%");
        }

        sql.append("GROUP BY ps.id, p.id"); // Add grouping at the end


        List<PsicologoFullDTO> psicologoFullDTOList = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql.toString())) {
            // Set the parameters dynamically based on what was added to the SQL query
            for (int i = 0; i < parameters.size(); i++) {
                preparedStatement.setString(i + 1, parameters.get(i));
            }

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    PsicologoFullDTO psicologoFullDTO = new PsicologoFullDTO(
                            String.valueOf(resultSet.getInt("psicologo_id")),
                            resultSet.getString("nome"),
                            resultSet.getString("email"),
                            "Público-alvo genérico",
                            resultSet.getString("descricao"),
                            resultSet.getString("crp"),
                            resultSet.getString("cpf"),
                            resultSet.getString("abordagens"),
                            resultSet.getDate("data_nascimento"),
                            150.0,
                            resultSet.getString("especialidades"),
                            "senhaFake",
                            resultSet.getString("telefone")
                    );

                    psicologoFullDTOList.add(psicologoFullDTO);
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing search: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return psicologoFullDTOList;
    }

}


