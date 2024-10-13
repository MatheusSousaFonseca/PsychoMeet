package br.psychomeet.backend.lds.backend.main.port.dao.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;

import java.util.List;

public interface ReadByPacienteDao {
    List<Consulta> consultaPorPaciente(int id);
}
