package br.psychomeet.backend.lds.backend.main.port.dao.psicologo;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.crud.CrudDao;

import java.util.List;

public interface PsicologoDao {

    int add(AddPsicologoDTO entity);

    void remove(int id);

    PsicologoFullDTO readById(int id);

    PsicologoFullDTO readByEmail(String email);


    List<PsicologoFullDTO> readAll();

    void updateInformation(int id, Psicologo entity);

    List<PsicologoFullDTO> search(String name, String especialidade);
}