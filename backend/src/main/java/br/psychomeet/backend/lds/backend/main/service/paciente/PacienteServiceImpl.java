package br.psychomeet.backend.lds.backend.main.service.paciente;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.paciente.PacienteDao;
import br.psychomeet.backend.lds.backend.main.port.service.paciente.PacienteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    private final PacienteDao pacienteDao;

    public PacienteServiceImpl(PacienteDao pacienteDao) {
        this.pacienteDao = pacienteDao;
    }

    @Override
    public int create(Paciente entity) {
        if (entity == null || entity.getPessoaId() <= 0) {
            return 0;
        }
        return pacienteDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        pacienteDao.remove(id);
    }

    @Override
    public Paciente findById(int id) {
        return (id < 0) ? null : pacienteDao.readById(id);
    }

    @Override
    public List<Paciente> findAll() {
        return pacienteDao.readAll();
    }

    @Override
    public void update(int id, Paciente entity) {
        Paciente paciente = findById(id);
        if (paciente != null) {
            pacienteDao.updateInformation(id, entity);
        }
    }

    @Override
    public Paciente getByPessoa(int id) {
        return pacienteDao.findByPessoa(id);
    }
}
