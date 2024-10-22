package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;

import java.util.ArrayList;
import java.util.List;

//@Repository
public class PacienteFakeDaoImpl implements PacienteDao {

    private static List<Paciente> pacientes = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public PacienteFakeDaoImpl() {
        Paciente paciente1 = new Paciente(getNextId(), 1);
        Paciente paciente2 = new Paciente(getNextId(), 2);

        pacientes.add(paciente1);
        pacientes.add(paciente2);
    }

    @Override
    public int add(Paciente entity) {
        final int id = getNextId();
        entity.setId(id);
        pacientes.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        pacientes.removeIf(paciente -> paciente.getId() == id);
    }

    @Override
    public Paciente readById(int id) {
        return pacientes.stream().filter(p -> p.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Paciente> readAll() {
        return pacientes;
    }

    @Override
    public void updateInformation(int id, Paciente entity) {
        Paciente paciente = readById(id);
        if (paciente != null) {
            paciente.setPessoaId(entity.getPessoaId());
        }
    }

    @Override
    public Paciente findByPessoa(int id) {
        return null;
    }
}
