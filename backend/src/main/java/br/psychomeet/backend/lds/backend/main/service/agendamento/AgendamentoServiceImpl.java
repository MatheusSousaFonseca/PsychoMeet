package br.psychomeet.backend.lds.backend.main.service.agendamento;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.agendamento.AgendamentoDao;
import br.psychomeet.backend.lds.backend.main.port.service.agendamento.AgendamentoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoServiceImpl implements AgendamentoService {

    private final AgendamentoDao agendamentoDao;

    public AgendamentoServiceImpl(AgendamentoDao agendamentoDao) {
        this.agendamentoDao = agendamentoDao;
    }

    @Override
    public int create(Agendamento entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getDataAgendamento() == null || entity.getDisponibilidadeId() == 0 || entity.getStatus().isEmpty()) {
            return 0;
        }

        return agendamentoDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        agendamentoDao.remove(id);
    }

    @Override
    public Agendamento findById(int id) {
        return (id < 0) ? null : agendamentoDao.readById(id);
    }

    @Override
    public List<Agendamento> findAll() {
        return agendamentoDao.readAll();
    }

    @Override
    public void update(int id, Agendamento entity) {
        Agendamento agendamento = findById(id);
        if (agendamento != null) {
            agendamentoDao.updateInformation(id, entity);
        }
    }

    @Override
    public List<AgendamentoDisponibilidadeDTO> findByPsicologo(int psicologoId, String status) {
        return agendamentoDao.readByPsicologo(psicologoId, status);
    }

    @Override
    public List<Agendamento> findByPaciente(int pacienteId, String status) {
        return agendamentoDao.readByPaciente(pacienteId, status);
    }

    @Override
    public void confirmarAgendamento(int agendamentoId) {
        agendamentoDao.confirmarAgendamento(agendamentoId);
    }
}
