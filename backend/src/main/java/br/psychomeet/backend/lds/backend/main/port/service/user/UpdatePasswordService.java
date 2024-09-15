package br.psychomeet.backend.lds.backend.main.port.service.user;

public interface UpdatePasswordService {

    boolean updatePassword(final int id, final String oldPassword, final String newPassword);

}
