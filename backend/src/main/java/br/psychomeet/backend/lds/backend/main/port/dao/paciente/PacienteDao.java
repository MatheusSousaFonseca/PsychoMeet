package br.psychomeet.backend.lds.backend.main.port.dao.paciente;

import br.psychomeet.backend.lds.backend.main.domain.Paciente;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

public interface PacienteDao extends CrudDao<Paciente> {

    Paciente findByPessoa(int id);
}
