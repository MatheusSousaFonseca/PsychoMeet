package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.dto.ConsultaAgendamentoDTO;
import br.psychomeet.backend.lds.backend.main.dto.FeedbackDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.consulta.ConsultaDao;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Repository
public class ConsultaFakeDaoImpl implements ConsultaDao {

    private static List<Consulta> consultas = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public ConsultaFakeDaoImpl() {
        Consulta consulta1 = new Consulta(getNextId(), 1, 8, "Ótimo atendimento");
        Consulta consulta2 = new Consulta(getNextId(), 2, 9, "Muito satisfeito");
        Consulta consulta3 = new Consulta(getNextId(), 1, 7, "Boa experiência");

        consultas.add(consulta1);
        consultas.add(consulta2);
        consultas.add(consulta3);
    }

    @Override
    public int add(Consulta entity) {
        final int id = getNextId();
        entity.setId(id);
        consultas.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        consultas.removeIf(consulta -> consulta.getId() == id);
    }

    @Override
    public Consulta readById(int id) {
        return consultas.stream().filter(c -> c.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Consulta> readAll() {
        return consultas;
    }

    @Override
    public void updateInformation(int id, Consulta entity) {
        Consulta consulta = readById(id);
        if (consulta != null) {
            consulta.setNotaPaciente(entity.getNotaPaciente());
            consulta.setComentarioPaciente(entity.getComentarioPaciente());
        }

    }

    @Override
    public List<ConsultaAgendamentoDTO> findByPacienteId(int pacienteId, String status) {
        return new ArrayList<>();
    }

    @Override
    public List<ConsultaAgendamentoDTO> findByPsicologoId(int psicologoId, String status) {
        // Aqui você deve implementar a lógica para retornar as consultas de acordo com o psicólogo
        // Para o exemplo, vamos retornar uma lista vazia, pois não temos a relação estabelecida
        return new ArrayList<>();
    }

    @Override
    public void giveFeedback(FeedbackDTO feedback) {

    }


}
