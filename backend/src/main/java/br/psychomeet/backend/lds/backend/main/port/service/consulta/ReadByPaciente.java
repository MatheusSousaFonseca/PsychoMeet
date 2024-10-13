package br.psychomeet.backend.lds.backend.main.port.service.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;

import java.util.List;

public interface ReadByPaciente {
    List<Consulta> findByPaciente(final int id);
}
