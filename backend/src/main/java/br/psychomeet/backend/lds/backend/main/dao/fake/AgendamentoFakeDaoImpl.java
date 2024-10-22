package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.dto.AgendamentoDisponibilidadeDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.agendamento.AgendamentoDao;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//@Repository
public class AgendamentoFakeDaoImpl implements AgendamentoDao {

    private static List<Agendamento> agendamentos = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public AgendamentoFakeDaoImpl() {

    }

    @Override
    public int add(Agendamento entity) {
        final int id = getNextId();
        entity.setId(id);
        agendamentos.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        agendamentos.removeIf(agendamento -> agendamento.getId() == id);
    }

    @Override
    public Agendamento readById(int id) {
        return agendamentos.stream().filter(a -> a.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Agendamento> readAll() {
        return agendamentos;
    }

    @Override
    public void updateInformation(int id, Agendamento entity) {
        Agendamento agendamento = readById(id);

    }

    @Override
    public List<AgendamentoDisponibilidadeDTO> readByPsicologo(int psicologoId, String status) {
        return List.of();
    }

    @Override
    public List<Agendamento> readByPaciente(int pacienteId, String status) {
        return List.of();
    }

    @Override
    public void confirmarAgendamento(int agendamentoId) {

    }
}
