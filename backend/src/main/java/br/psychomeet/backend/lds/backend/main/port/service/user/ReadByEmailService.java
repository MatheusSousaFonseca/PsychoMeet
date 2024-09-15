package br.psychomeet.backend.lds.backend.main.port.service.user;

import br.psychomeet.backend.lds.backend.main.domain.UserModel;

public interface ReadByEmailService {
    UserModel findByEmail(final String email);
}
