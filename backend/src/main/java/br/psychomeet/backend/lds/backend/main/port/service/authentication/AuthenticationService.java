package br.psychomeet.backend.lds.backend.main.port.service.authentication;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;

public interface AuthenticationService {

    Pessoa authenticate(final String email, final String password);

}
