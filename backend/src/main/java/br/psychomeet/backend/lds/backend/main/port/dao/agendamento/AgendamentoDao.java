package br.psychomeet.backend.lds.backend.main.port.dao.agendamento;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface AgendamentoDao extends CrudDao<Agendamento> {

    List<AgendamentoDisponibilidadeDTO> readByPsicologo(int psicologoId, String status);

    List<Agendamento> readByPaciente(int pacienteId, String status);


    void confirmarAgendamento(int agendamentoId);
}
