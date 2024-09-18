package br.psychomeet.backend.lds.backend.main.service.especialidade;

import br.psychomeet.backend.lds.backend.main.domain.Especialidade;
import br.psychomeet.backend.lds.backend.main.port.dao.especialidade.EspecialidadeDao;
import br.psychomeet.backend.lds.backend.main.port.service.especialidade.EspecialidadeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadeServiceImpl implements EspecialidadeService {

    private final EspecialidadeDao especialidadeDao;

    public EspecialidadeServiceImpl(EspecialidadeDao especialidadeDao) {
        this.especialidadeDao = especialidadeDao;
    }

    @Override
    public int create(Especialidade entity) {
        if (entity == null || entity.getDescricao().isEmpty()) {
            return 0;
        }
        return especialidadeDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        especialidadeDao.remove(id);
    }

    @Override
    public Especialidade findById(int id) {
        return (id < 0) ? null : especialidadeDao.readById(id);
    }

    @Override
    public List<Especialidade> findAll() {
        return especialidadeDao.readAll();
    }

    @Override
    public void update(int id, Especialidade entity) {
        Especialidade especialidade = findById(id);
        if (especialidade != null) {
            especialidadeDao.updateInformation(id, entity);
        }
    }
}
