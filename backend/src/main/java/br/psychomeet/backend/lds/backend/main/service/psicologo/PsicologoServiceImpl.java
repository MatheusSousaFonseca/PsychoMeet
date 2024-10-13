package br.psychomeet.backend.lds.backend.main.service.psicologo;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;
import br.psychomeet.backend.lds.backend.main.port.service.psicologo.PsicologoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PsicologoServiceImpl implements PsicologoService {

    private final PsicologoDao psicologoDao;

    public PsicologoServiceImpl(PsicologoDao psicologoDao) {
        this.psicologoDao = psicologoDao;
    }

    @Override
    public int create(AddPsicologoDTO entity) {
        if (entity == null || entity.getCrp().isEmpty() || entity.getDescricao().isEmpty()) {
            return 0;
        }
        return psicologoDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        psicologoDao.remove(id);
    }

    @Override
    public PsicologoFullDTO findById(int id) {
        return psicologoDao.readById(id);
    }

    @Override
    public List<PsicologoFullDTO> findAll() {
        return psicologoDao.readAll();
    }

    @Override
    public void update(int id, Psicologo entity) {
        Psicologo psicologo = findById(id).getPsicologo();
        if (psicologo != null) {
            psicologoDao.updateInformation(id, entity);
        }
    }
}
