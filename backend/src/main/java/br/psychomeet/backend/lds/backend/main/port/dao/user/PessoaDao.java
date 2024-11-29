package br.psychomeet.backend.lds.backend.main.port.dao.user;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

public interface PessoaDao extends CrudDao<Pessoa>, ReadByEmailDaoPessoa,UpdatePasswordDao {

    public void updateFoto(int id, byte[] foto) ;


    public byte[] readFotoById(int id) ;
}
