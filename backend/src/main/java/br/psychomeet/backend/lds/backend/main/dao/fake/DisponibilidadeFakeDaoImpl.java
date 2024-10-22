package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Disponibilidade;
import br.psychomeet.backend.lds.backend.main.port.dao.disponibilidade.DisponibilidadeDao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DisponibilidadeFakeDaoImpl implements DisponibilidadeDao {

    private static List<Disponibilidade> disponibilidades = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public DisponibilidadeFakeDaoImpl() {
        System.out.println("Instância de disponibilidade fake dao obtida");

    }

    @Override
    public int add(Disponibilidade entity) {
        final int id = getNextId();
        entity.setId(id);
        disponibilidades.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        disponibilidades.removeIf(disponibilidade -> disponibilidade.getId() == id);
    }

    @Override
    public Disponibilidade readById(int id) {
        return disponibilidades.stream().filter(d -> d.getId() == id).findFirst().orElse(null);
    }

    @Override
    public List<Disponibilidade> readAll() {
        return disponibilidades;
    }

    @Override
    public void updateInformation(int id, Disponibilidade entity) {
        Disponibilidade disponibilidade = readById(id);

    }

    @Override
    public void removeByDate(Disponibilidade disponibilidade) {

    }

    @Override
    public List<Disponibilidade> getByPsicologo(int psicologo_id) {
        return List.of();
    }
}

