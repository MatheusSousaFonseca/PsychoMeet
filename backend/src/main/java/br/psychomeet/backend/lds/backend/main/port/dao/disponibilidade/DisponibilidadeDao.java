package br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface DisponibilidadeDao extends CrudDao<Disponibilidade> {

    void removeByDate(Disponibilidade disponibilidade);

    List<Disponibilidade> getByPsicologo(int psicologo_id);
}

