package br.psychomeet.backend.lds.backend.main.port.service.user;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;

public interface ReadByEmailServicePessoa {
    Pessoa findByEmail(final String email);
}
