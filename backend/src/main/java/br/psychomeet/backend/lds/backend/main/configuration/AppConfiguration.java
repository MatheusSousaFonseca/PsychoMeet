package br.psychomeet.backend.lds.backend.main.configuration;

import br.psychomeet.backend.lds.backend.main.dao.fake.*;
import br.psychomeet.backend.lds.backend.main.dao.h2.UserH2DaoImpl;
import br.psychomeet.backend.lds.backend.main.dao.postgres.*;
import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.dao.agendamento.AgendamentoDao;
import br.psychomeet.backend.lds.backend.main.port.dao.consulta.ConsultaDao;
import br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade.DisponibilidadeDao;
import br.psychomeet.backend.lds.backend.main.port.dao.especialidade.EspecialidadeDao;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;
import br.psychomeet.backend.lds.backend.main.port.dao.user.PessoaDao;
import br.psychomeet.backend.lds.backend.main.port.dao.user.UserDao;
import br.psychomeet.backend.lds.backend.main.port.service.especialidade.EspecialidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade.DisponibilidadeDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;

@Configuration
public class AppConfiguration {

    //@Bean
    //@Profile("fake")
    //public UserDao getUserFakeDao(){
    //    return new UserFakeDaoImpl();
    //}
//
    //@Bean
    //@Profile("fake")
    //public PessoaDao getPessoaFakeDao(){
    //    return new PessoaFakeDaoImpl();
    //}
//
    //@Bean
    //@Profile("fake")
    //public PsicologoDao getPsicologoFakeDao(){
    //    return new PsicologoFakeDaoImpl();
    //}
//
    //@Bean
    //@Profile("fake")
    //public PacienteDao getPacienteFakeDao(){
    //    return new PacienteFakeDaoImpl();
    //}
//
    //@Bean
    //@Profile("fake")
    //public DisponibilidadeDao getDisponibilidadeFakeDao(){
    //    return new DisponibilidadeFakeDaoImpl();
    //}
//
//
    //@Bean
    //@Profile("dev")
    //public UserDao getH2Dao(final JdbcTemplate jdbcTemplate){
    //    return new UserH2DaoImpl(jdbcTemplate);
    //}


    @Bean
    @Profile("prod")
    public PessoaDao getPessoaPostgresDao(final Connection connection) {
        return new PessoaPostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public PsicologoDao getPsicologoPostgresDao(final Connection connection) {
        return new PsicologoPostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public PacienteDao getPacientePostgresDao(final Connection connection) {
        return new PacientePostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public DisponibilidadeDao getDisponibilidadePostgresDao(final Connection connection) {
        return new DisponibilidadePostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public AgendamentoDao getAgendamentoPostgresDao(final Connection connection) {
        return new AgendamentoPostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public ConsultaDao getConsultaPostgresDao(final Connection connection) {
        return new ConsultaPostgresDaoImpl(connection);
    }

    @Bean
    @Profile("prod")
    public EspecialidadeDao getEspecialidadePostgresDao(final Connection connection) {
        return new EspecialidadePostgresDaoImpl(connection);
    }
}




