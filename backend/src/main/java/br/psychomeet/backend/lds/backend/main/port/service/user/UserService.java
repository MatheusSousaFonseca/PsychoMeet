package br.psychomeet.backend.lds.backend.main.port.service.user;

import br.psychomeet.backend.lds.backend.main.domain.UserModel;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

public interface UserService extends CrudService<UserModel>, ReadByEmailService, UpdatePasswordService {
}
