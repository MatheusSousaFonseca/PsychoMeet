package br.psychomeet.backend.lds.backend.main.dao.postgres;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
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
    public Psicologo readById(int id) {
        String sql = "SELECT * FROM psicologo WHERE id = ?;";
        Psicologo psicologo = null;

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    psicologo = new Psicologo();
                    psicologo.setId(resultSet.getInt("id"));
                    psicologo.setPessoaId(resultSet.getInt("pessoa_id"));
                    psicologo.setCrp(resultSet.getString("crp"));
                    psicologo.setDescricao(resultSet.getString("descricao"));
                }
            }
        } catch (SQLException e) {
            logger.severe("Error executing readById: " + e.getMessage());
            throw new RuntimeException(e);
        }
        return psicologo;
    }

    @Override
    public List<Psicologo> readAll() {
        String sql = "SELECT * FROM psicologo;";
        List<Psicologo> psicologos = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Psicologo psicologo = new Psicologo();
                psicologo.setId(resultSet.getInt("id"));
                psicologo.setPessoaId(resultSet.getInt("pessoa_id"));
                psicologo.setCrp(resultSet.getString("crp"));
                psicologo.setDescricao(resultSet.getString("descricao"));

                psicologos.add(psicologo);
            }
        } catch (SQLException e) {
            logger.severe("Error executing readAll: " + e.getMessage());
            throw new RuntimeException(e);
        }

        return psicologos;
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
