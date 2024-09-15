package br.psychomeet.backend.lds.backend.main.port.service.crud;

public interface CrudService<T> extends
        CreateService<T>,
        ReadService<T>,
        UpdateService<T>,
        DeleteService {


}
