package br.psychomeet.backend.lds.backend.main.port.dao.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.dto.ConsultaAgendamentoDTO;
import br.psychomeet.backend.lds.backend.main.dto.FeedbackDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface ConsultaDao extends CrudDao<Consulta> {
    List<ConsultaAgendamentoDTO> findByPacienteId(int pacienteId, String status);

    List<ConsultaAgendamentoDTO> findByPsicologoId(int psicologoId, String status);

    void giveFeedback(FeedbackDTO feedback);
}
