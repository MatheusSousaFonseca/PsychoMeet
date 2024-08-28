package br.psychomeet.backend.lds.backend.main.port.dao.crud;

public interface CrudDao<T> extends
        CreateDao<T>,

        ReadDao<T>,

        UpdateDao<T>,

        DeleteDao{
}
