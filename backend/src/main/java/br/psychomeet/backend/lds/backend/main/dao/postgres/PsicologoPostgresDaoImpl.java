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

    public PsicologoPostgresDaoImpl( Connection connection) {
        this.connection = connection;
    }


    @Override
    public int add(AddPsicologoDTO entity) {
        String sqlPessoa = "INSERT INTO pessoa (telefone, nome, senha, data_nascimento, cpf, email) VALUES (?, ?, ?, ?, ?, ?) RETURNING id;";
        String sqlPsicologo = "INSERT INTO psicologo (pessoa_id, crp, descricao) VALUES (?, ?, ?) RETURNING id;";
        String sqlPaciente = "INSERT INTO paciente (pessoa_id) VALUES (?);"; // Novo SQL para inserir em paciente
        String sqlEspecialidade = "INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id) VALUES (?, ?);";
        String sqlAbordagem = "INSERT INTO abordagem (psicologo_id, abordagem) VALUES (?, ?);";

        PreparedStatement preparedStatementPessoa = null;
        PreparedStatement preparedStatementPsicologo = null;
        PreparedStatement preparedStatementPaciente = null; // PreparedStatement para paciente
        PreparedStatement preparedStatementEspecialidade = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);

            // 1. Inserir na tabela pessoa
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
                pessoaId = resultSet.getInt(1); // Obter o ID gerado para pessoa
            }

            // 2. Inserir na tabela psicologo
            preparedStatementPsicologo = connection.prepareStatement(sqlPsicologo);
            preparedStatementPsicologo.setInt(1, pessoaId);
            preparedStatementPsicologo.setString(2, entity.getCrp());
            preparedStatementPsicologo.setString(3, entity.getDescricao());

            resultSet = preparedStatementPsicologo.executeQuery();
            int psicologoId = 0;
            if (resultSet.next()) {
                psicologoId = resultSet.getInt(1); // Obter o ID gerado para psicólogo
            }

            // 3. Inserir como paciente também
            preparedStatementPaciente = connection.prepareStatement(sqlPaciente);
            preparedStatementPaciente.setInt(1, pessoaId); // Usar o ID da pessoa
            preparedStatementPaciente.executeUpdate();

            // 4. Inserir especialidades
            for (String especialidade : entity.getEspecialidades()) {
                int especialidadeId = especialidadeService.getIdByName(especialidade);
                if (especialidadeId != -1) { // Somente insere se o ID da especialidade for válido
                    preparedStatementEspecialidade = connection.prepareStatement(sqlEspecialidade);
                    preparedStatementEspecialidade.setInt(1, psicologoId);
                    preparedStatementEspecialidade.setInt(2, especialidadeId);
                    preparedStatementEspecialidade.executeUpdate();
                }
            }

            // 5. Inserir abordagens
            for (String abordagem : entity.getAbordagens()) {
                preparedStatementEspecialidade = connection.prepareStatement(sqlAbordagem);
                preparedStatementEspecialidade.setInt(1, psicologoId);
                preparedStatementEspecialidade.setString(2, abordagem);
                preparedStatementEspecialidade.executeUpdate();
            }

            connection.commit(); // Commit de todas as inserções
            return psicologoId; // Retorna o ID do psicólogo recém-criado


        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                logger.severe("Erro ao desfazer a transação: " + ex.getMessage());
                throw new RuntimeException(ex);
            }

            // Verificar se o erro é de chave única duplicada
            if ("23505".equals(e.getSQLState())) {
                if (e.getMessage().contains("pessoa_telefone_key")) {
                    throw new RuntimeException("Telefone já cadastrado!");
                } else if (e.getMessage().contains("pessoa_email_key")) {
                    throw new RuntimeException("E-mail já cadastrado!");
                } else if (e.getMessage().contains("pessoa_cpf_key")) {
                    throw new RuntimeException("CPF já cadastrado!");
                } else if (e.getMessage().contains("psicologo_crp_key")) {
                    throw new RuntimeException("CRP já cadastrado!");
                }
            }

            logger.severe("Erro ao executar o método add: " + e.getMessage());
            throw new RuntimeException("Erro ao inserir psicólogo: " + e.getMessage());
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatementPessoa != null) preparedStatementPessoa.close();
                if (preparedStatementPsicologo != null) preparedStatementPsicologo.close();
                if (preparedStatementPaciente != null) preparedStatementPaciente.close();
                if (preparedStatementEspecialidade != null) preparedStatementEspecialidade.close();
            } catch (SQLException e) {
                logger.severe("Erro ao fechar os recursos: " + e.getMessage());
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
                "GROUP BY ps.id, p.id;"; // Grouping to avoid duplicates

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
    public PsicologoFullDTO readByEmail(String email) {
        String sql = "SELECT ps.id AS psicologo_id, ps.crp, ps.descricao, p.id AS pessoa_id, p.nome, p.email, p.telefone, p.data_nascimento, p.cpf, " +
                "STRING_AGG(DISTINCT e.descricao, ', ') AS especialidades, " +
                "STRING_AGG(DISTINCT a.abordagem, ', ') AS abordagens " +
                "FROM psicologo ps " +
                "JOIN pessoa p ON ps.pessoa_id = p.id " +
                "LEFT JOIN psicologo_especialidade pe ON pe.psicologo_id = ps.id " +
                "LEFT JOIN especialidade e ON e.id = pe.especialidade_id " +
                "LEFT JOIN abordagem a ON a.psicologo_id = ps.id " +
                "WHERE p.email = ? " +
                "GROUP BY ps.id, p.id;"; // Grouping to avoid duplicates

        PsicologoFullDTO psicologoFullDTO = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, email);

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
            logger.severe("Erro ao executar readByEmail: " + e.getMessage());
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
                "GROUP BY ps.id, p.id;"; // Grouping to avoid duplicates

        List<PsicologoFullDTO> psicologoFullDTOList = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                System.out.println(resultSet.getString("abordagens"));
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
                        resultSet.getString("telefone")
                );

                psicologoFullDTOList.add(psicologoFullDTO);
            }
        } catch (SQLException e) {
            logger.severe("Error executing findAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return psicologoFullDTOList;
    }






    @Override
    public void updateInformation(int id, AddPsicologoDTO entity) {
        String sqlUpdatePessoa = "UPDATE pessoa SET telefone = ?, nome = ?, data_nascimento = ?, cpf = ?, email = ? WHERE id = ?;";
        String sqlUpdatePsicologo = "UPDATE psicologo SET crp = ?, descricao = ? WHERE pessoa_id = ?;";
        String sqlDeleteEspecialidades = "DELETE FROM psicologo_especialidade WHERE psicologo_id = ?;";
        String sqlInsertEspecialidade = "INSERT INTO psicologo_especialidade (psicologo_id, especialidade_id) VALUES (?, ?);";
        String sqlDeleteAbordagens = "DELETE FROM abordagem WHERE psicologo_id = ?;";
        String sqlInsertAbordagem = "INSERT INTO abordagem (psicologo_id, abordagem) VALUES (?, ?);";

        PreparedStatement preparedStatementPessoa = null;
        PreparedStatement preparedStatementPsicologo = null;
        PreparedStatement preparedStatementEspecialidade = null;
        PreparedStatement preparedStatementAbordagem = null;
        ResultSet resultSet = null;

        try {
            connection.setAutoCommit(false);

            // Atualizando os dados na tabela "pessoa"
            preparedStatementPessoa = connection.prepareStatement(sqlUpdatePessoa);
            preparedStatementPessoa.setString(1, entity.getTelefone());
            preparedStatementPessoa.setString(2, entity.getNome());
            preparedStatementPessoa.setDate(3, new java.sql.Date(entity.getDataNascimento().getTime()));
            preparedStatementPessoa.setString(4, entity.getCpf());
            preparedStatementPessoa.setString(5, entity.getEmail());
            preparedStatementPessoa.setInt(6, id);  // O ID do psicólogo é o mesmo da pessoa
            preparedStatementPessoa.executeUpdate();

            // Atualizando os dados na tabela "psicologo"
            preparedStatementPsicologo = connection.prepareStatement(sqlUpdatePsicologo);
            preparedStatementPsicologo.setString(1, entity.getCrp());
            preparedStatementPsicologo.setString(2, entity.getDescricao());
            preparedStatementPsicologo.setInt(3, id);
            preparedStatementPsicologo.executeUpdate();

            // Deletando as especialidades anteriores
            preparedStatementEspecialidade = connection.prepareStatement(sqlDeleteEspecialidades);
            preparedStatementEspecialidade.setInt(1, id);
            preparedStatementEspecialidade.executeUpdate();

            // Inserindo as novas especialidades
            for (String especialidade : entity.getEspecialidades()) {
                int especialidadeId = especialidadeService.getIdByName(especialidade);
                if (especialidadeId != -1) {
                    preparedStatementEspecialidade = connection.prepareStatement(sqlInsertEspecialidade);
                    preparedStatementEspecialidade.setInt(1, id);
                    preparedStatementEspecialidade.setInt(2, especialidadeId);
                    preparedStatementEspecialidade.executeUpdate();
                }
            }

            // Deletando as abordagens anteriores
            preparedStatementAbordagem = connection.prepareStatement(sqlDeleteAbordagens);
            preparedStatementAbordagem.setInt(1, id);
            preparedStatementAbordagem.executeUpdate();

            // Inserindo as novas abordagens
            for (String abordagem : entity.getAbordagens()) {
                preparedStatementAbordagem = connection.prepareStatement(sqlInsertAbordagem);
                preparedStatementAbordagem.setInt(1, id);
                preparedStatementAbordagem.setString(2, abordagem);
                preparedStatementAbordagem.executeUpdate();
            }

            connection.commit();  // Commitando todas as atualizações
        } catch (SQLException e) {
            try {
                connection.rollback();  // Revertendo alterações caso haja erro
            } catch (SQLException ex) {
                logger.severe("Error rolling back transaction: " + ex.getMessage());
                throw new RuntimeException(ex);
            }
            logger.severe("Error executing updateInformation: " + e.getMessage());
            throw new RuntimeException(e);
        } finally {
            try {
                if (resultSet != null) resultSet.close();
                if (preparedStatementPessoa != null) preparedStatementPessoa.close();
                if (preparedStatementPsicologo != null) preparedStatementPsicologo.close();
                if (preparedStatementEspecialidade != null) preparedStatementEspecialidade.close();
                if (preparedStatementAbordagem != null) preparedStatementAbordagem.close();
            } catch (SQLException e) {
                logger.severe("Error closing resources: " + e.getMessage());
            }
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
                            resultSet.getString("abordagens"), // Get the concatenated string of approaches
                            resultSet.getDate("data_nascimento"),
                            150.0,
                            resultSet.getString("especialidades"), // Get the concatenated string of specialties
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