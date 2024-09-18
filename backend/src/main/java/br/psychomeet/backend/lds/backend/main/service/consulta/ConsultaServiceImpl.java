package br.psychomeet.backend.lds.backend.main.service.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.port.dao.consulta.ConsultaDao;
import br.psychomeet.backend.lds.backend.main.port.service.consulta.ConsultaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultaServiceImpl implements ConsultaService {

    private final ConsultaDao consultaDao;

    public ConsultaServiceImpl(ConsultaDao consultaDao) {
        this.consultaDao = consultaDao;
    }

    @Override
    public int create(Consulta entity) {
        if (entity == null) {
            return 0;
        }
        if (entity.getNotaPaciente() < 0) {
            return 0;
        }

        return consultaDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        consultaDao.remove(id);
    }

    @Override
    public Consulta findById(int id) {
        return (id < 0) ? null : consultaDao.readById(id);
    }

    @Override
    public List<Consulta> findAll() {
        return consultaDao.readAll();
    }

    @Override
    public void update(int id, Consulta entity) {
        Consulta consulta = findById(id);
        if (consulta != null) {
            consultaDao.updateInformation(id, entity);
        }
    }


}
