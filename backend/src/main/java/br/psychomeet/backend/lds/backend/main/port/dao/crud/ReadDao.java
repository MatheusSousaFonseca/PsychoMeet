package br.psychomeet.backend.lds.backend.main.port.dao.crud;

import java.util.List;

public interface ReadDao<T> {

    T readById(final int id);
    List<T> readAll();
}
