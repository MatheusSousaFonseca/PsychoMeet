package br.psychomeet.backend.lds.backend.main.port.service.disponibilidade;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface DisponibilidadeService extends CrudService<Disponibilidade> {

    void removeByDate(Disponibilidade disponibilidade);

    List<Disponibilidade> getByPsicologo(int psicologo_id);
}
