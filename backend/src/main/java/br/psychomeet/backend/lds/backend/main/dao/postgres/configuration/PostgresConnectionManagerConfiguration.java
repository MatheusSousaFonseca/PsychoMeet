package br.psychomeet.backend.lds.backend.main.dao.postgres.configuration;

import br.psychomeet.backend.lds.backend.main.port.service.util.ResourceFileService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.*;

@Configuration
@Profile("prod")
public class PostgresConnectionManagerConfiguration {

        @Value("${spring.datasource.base.url}")
        private String databaseBaseUrl;

        @Value("${spring.datasource.url}")
        private String databaseUrl;

        @Value("${spring.datasource.username}")
        private String databaseUsername;

        @Value("${spring.datasource.password}")
        private String databasePassword;

        @Value("${spring.datasource.name}")
        private String databaseName;



        @Bean
        public DataSource dataSource() throws SQLException {
            final DataSource build = DataSourceBuilder.create().url(databaseBaseUrl).username(databaseUsername).password(databasePassword).build();
            final Connection connection = build.getConnection();
            createDatabaseIfNotExists(connection);
            return build;
        }

        private void createDatabaseIfNotExists(Connection connection) throws SQLException {

            final Statement statement = connection.createStatement();
            String sql = "SELECT COUNT(*) AS dbs ";
            sql += " FROM pg_catalog.pg_database ";
            sql += " WHERE lower(datname) = '" + databaseName + "';";

            ResultSet resultSet = statement.executeQuery(sql);
            boolean dbExists = resultSet.next();
            if (!dbExists || resultSet.getInt("dbs") == 0){
                String createDbSql = "CREATE DATABASE " + databaseName + " WITH ";
                createDbSql += "OWNER = postgres ENCODING = 'UTF8' ";
                createDbSql += "CONNECTION LIMIT = -1; ";

                PreparedStatement preparedStatement = connection.prepareStatement(createDbSql);
                preparedStatement.executeUpdate();
                preparedStatement.close();
            }
        }

        @Bean
        @DependsOn("dataSource")
        public Connection getConnection() throws SQLException{
            HikariConfig hikariConfig = new HikariConfig();
            hikariConfig.setJdbcUrl(databaseUrl);
            hikariConfig.setUsername(databaseUsername);
            hikariConfig.setPassword(databasePassword);
            return new HikariDataSource(hikariConfig).getConnection();
        }

        @Autowired
        private ResourceFileService resourceFileService;

        @Bean
        @DependsOn("getConnection")
        public boolean createTableAndInsertData() throws SQLException, IOException {
            Connection connection = getConnection();

            final String basePath = "psychomeet";
            final String createTable = resourceFileService.read(basePath + "/create-tables-postgres.sql");
            PreparedStatement createStatement = connection.prepareStatement(createTable);
            createStatement.executeUpdate();
            createStatement.close();

            final String insertData = resourceFileService.read(basePath + "/insert-data.sql");
            PreparedStatement insertStatement = connection.prepareStatement(insertData);
            insertStatement.execute();
            insertStatement.close();

            return true;
        }
}
