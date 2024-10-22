package br.psychomeet.backend.lds.backend.main.port.service.psicologo;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.service.crud.CrudService;

import java.util.List;

public interface PsicologoService {

    int create(AddPsicologoDTO entity);

    void delete(int id);

    PsicologoFullDTO findById(int id);

    List<PsicologoFullDTO> findAll();

    void update(int id, AddPsicologoDTO entity);  // Mudando o parâmetro para AddPsicologoDTO


    List<PsicologoFullDTO> search(String name, String especialidade);

    PsicologoFullDTO findByEmail(String email);
}

