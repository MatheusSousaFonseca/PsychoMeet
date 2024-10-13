package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Especialidade;
import br.psychomeet.backend.lds.backend.main.port.dao.especialidade.EspecialidadeDao;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

//@Repository
public class EspecialidadeFakeDaoImpl implements EspecialidadeDao {

    private static List<Especialidade> especialidades = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public EspecialidadeFakeDaoImpl() {
        Especialidade especialidade1 = new Especialidade(getNextId(), "Psicologia Infantil");
        Especialidade especialidade2 = new Especialidade(getNextId(), "Psicologia do Trabalho");

        especialidades.add(especialidade1);
        especialidades.add(especialidade2);
    }

    @Override
    public int add(Especialidade entity) {
        final int id = getNextId();
        entity.setId(id);
        especialidades.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        especialidades.removeIf(especialidade -> especialidade.getId() == id);
    }

    @Override
    public Especialidade readById(int id) {
        return especialidades.stream().filter(e -> e.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Especialidade> readAll() {
        return especialidades;
    }

    @Override
    public void updateInformation(int id, Especialidade entity) {
        Especialidade especialidade = readById(id);
        if (especialidade != null) {
            especialidade.setDescricao(entity.getDescricao());
        }
    }
    @Override
    public int getIdByName(String name) {
        return 0;
    }
}
