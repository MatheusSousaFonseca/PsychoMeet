package br.psychomeet.backend.lds.backend.main.port.dao.user;

import br.psychomeet.backend.lds.backend.main.domain.UserModel;

public interface ReadByEmailDao {

    UserModel readByEmail(final String email);
}
