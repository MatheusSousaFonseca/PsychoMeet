package br.psychomeet.backend.lds.backend.main.port.service.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.dto.ConsultaAgendamentoDTO;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface ConsultaService extends CrudService<Consulta> {
    List<ConsultaAgendamentoDTO> findByPaciente(int id, String status);

    List<ConsultaAgendamentoDTO> findByPsicologo(int id, String status);
}
