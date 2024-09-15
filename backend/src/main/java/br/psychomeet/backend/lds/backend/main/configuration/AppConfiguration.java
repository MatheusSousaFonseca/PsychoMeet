package br.psychomeet.backend.lds.backend.main.configuration;

import br.psychomeet.backend.lds.backend.main.dao.fake.PessoaFakeDaoImpl;
import br.psychomeet.backend.lds.backend.main.dao.fake.UserFakeDaoImpl;
import br.psychomeet.backend.lds.backend.main.dao.h2.UserH2DaoImpl;
import br.psychomeet.backend.lds.backend.main.dao.postgres.UserPostgresDaoImpl;
import br.psychomeet.backend.lds.backend.main.port.dao.user.PessoaDao;
import br.psychomeet.backend.lds.backend.main.port.dao.user.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;

@Configuration
public class AppConfiguration {

    @Bean
    @Profile("fake")
    public UserDao getUserFakeDao(){
        return new UserFakeDaoImpl();
    }

    @Bean
    @Profile("fake")
    public PessoaDao getPessoaFakeDao(){
        return new PessoaFakeDaoImpl();
    }

    @Bean
    @Profile("dev")
    public UserDao getH2Dao(final JdbcTemplate jdbcTemplate){
        return new UserH2DaoImpl(jdbcTemplate);
    }

    @Bean
    @Profile("prod")
    public UserDao getUserDao(final Connection connection){

        return new UserPostgresDaoImpl(connection);
    }
}

