package br.psychomeet.backend.lds.backend.main.port.dao.consulta;

import br.psychomeet.backend.lds.backend.main.domain.Consulta;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

public interface ConsultaDao extends CrudDao<Consulta>, ReadByPacienteDao {
}
