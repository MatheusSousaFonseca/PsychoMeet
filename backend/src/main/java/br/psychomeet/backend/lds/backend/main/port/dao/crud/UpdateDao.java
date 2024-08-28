package br.psychomeet.backend.lds.backend.main.port.dao.crud;

public interface UpdateDao<T>{

    void updateInformation(final int id, final T entity);
}
