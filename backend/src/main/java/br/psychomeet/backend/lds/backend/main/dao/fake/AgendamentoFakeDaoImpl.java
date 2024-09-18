package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Agendamento;
import br.psychomeet.backend.lds.backend.main.port.dao.agendamento.AgendamentoDao;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class AgendamentoFakeDaoImpl implements AgendamentoDao {

    private static List<Agendamento> agendamentos = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public AgendamentoFakeDaoImpl() {
        Agendamento agendamento1 = new Agendamento(getNextId(), new Date(), 1, 1, new Time(9, 0, 0), new Time(10, 0, 0), "Pendente");
        Agendamento agendamento2 = new Agendamento(getNextId(), new Date(), 2, 1, new Time(10, 0, 0), new Time(11, 0, 0), "Confirmado");

        agendamentos.add(agendamento1);
        agendamentos.add(agendamento2);
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
        if (agendamento != null) {
            agendamento.setData(entity.getData());
            agendamento.setHoraInicio(entity.getHoraInicio());
            agendamento.setHoraFim(entity.getHoraFim());
            agendamento.setStatus(entity.getStatus());
        }
    }
}
