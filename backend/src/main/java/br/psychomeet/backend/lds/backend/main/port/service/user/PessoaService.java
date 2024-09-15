package br.psychomeet.backend.lds.backend.main.port.service.user;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

public interface PessoaService extends CrudService<Pessoa>, ReadByEmailServicePessoa, UpdatePasswordService{
}
