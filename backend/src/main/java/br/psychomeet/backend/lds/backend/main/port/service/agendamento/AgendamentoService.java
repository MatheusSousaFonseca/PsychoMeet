package br.psychomeet.backend.lds.backend.main.port.service.agendamento;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface AgendamentoService extends CrudService<Agendamento> {

    List<AgendamentoDisponibilidadeDTO> findByPsicologo(int psicologoId, String status);

    List<Agendamento> findByPaciente(int pacienteId, String status);


    public void confirmarAgendamento(int agendamentoId);
}
