package br.psychomeet.backend.lds.backend.main.port.dao.user;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;

public interface ReadByEmailDaoPessoa {
    Pessoa readByEmail(final String email);
}
