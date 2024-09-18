package br.psychomeet.backend.lds.backend.main.service.disponibilidade;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade.DisponibilidadeDao;
import br.psychomeet.backend.lds.backend.main.port.service.disponibilidade.DisponibilidadeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisponibilidadeServiceImpl implements DisponibilidadeService {

    private final DisponibilidadeDao disponibilidadeDao;

    public DisponibilidadeServiceImpl(DisponibilidadeDao disponibilidadeDao) {
        this.disponibilidadeDao = disponibilidadeDao;
    }


    @Override
    public int create(Disponibilidade entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getDataInicio() == null || entity.getDataFim() == null) {
            return 0;
        }

        return disponibilidadeDao.add(entity);

    }
    @Override
    public void delete(int id) {
        if (id < 0){
            return;
        }
        disponibilidadeDao.remove(id);
    }

    @Override
    public Disponibilidade findById(int id) {
        return (id < 0) ? null : disponibilidadeDao.readById(id);
    }

    @Override
    public List<Disponibilidade> findAll() {
        return disponibilidadeDao.readAll();
    }

    @Override
    public void update(int id, Disponibilidade entity) {
        Disponibilidade disponibilidade = findById(id);
        if (disponibilidade != null){
            disponibilidadeDao.updateInformation(id,entity);
        }

    }
}
