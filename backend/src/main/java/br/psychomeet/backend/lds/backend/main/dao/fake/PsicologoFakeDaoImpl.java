package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;

import java.util.ArrayList;
import java.util.List;

//@Repository
public class PsicologoFakeDaoImpl implements PsicologoDao {

    private static List<Psicologo> psicologos = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public PsicologoFakeDaoImpl() {
        System.out.println("Instância de psicologo fake dao obtida");
        Psicologo psicologo1 = new Psicologo(getNextId(), 1, "CRP12345", "Descrição 1");
        Psicologo psicologo2 = new Psicologo(getNextId(), 2, "CRP67890", "Descrição 2");

        psicologos.add(psicologo1);
        psicologos.add(psicologo2);
    }

    @Override
    public int add(Psicologo entity) {
        final int id = getNextId();
        entity.setId(id);
        psicologos.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        psicologos.removeIf(psicologo -> psicologo.getId() == id);
    }

    @Override
    public Psicologo readById(int id) {
        return psicologos.stream().filter(p -> p.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Psicologo> readAll() {
        return psicologos;
    }

    @Override
    public void updateInformation(int id, Psicologo entity) {
        Psicologo psicologo = readById(id);
        if (psicologo != null) {
            psicologo.setCrp(entity.getCrp());
            psicologo.setDescricao(entity.getDescricao());
        }
    }
}
