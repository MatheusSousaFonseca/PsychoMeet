package br.psychomeet.backend.lds.backend.main.port.service.crud;

public interface UpdateService <T>{

    void update(final int id, final T entity);
}
