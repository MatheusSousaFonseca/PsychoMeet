package br.psychomeet.backend.lds.backend.main.port.dao.user;

public interface UpdatePasswordDao {

    boolean updatePassword(final int id, final String oldPassword, final String newPassword);
}
