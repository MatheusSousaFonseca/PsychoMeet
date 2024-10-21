package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.domain.Psicologo;
import br.psychomeet.backend.lds.backend.main.dto.AddPsicologoDTO;
import br.psychomeet.backend.lds.backend.main.dto.PsicologoFullDTO;
import br.psychomeet.backend.lds.backend.main.port.dao.psicologo.PsicologoDao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//@Repository
public class PsicologoFakeDaoImpl implements PsicologoDao {

    private static List<PsicologoFullDTO> psicologos = new ArrayList<>();
    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public PsicologoFakeDaoImpl() {
        System.out.println("Instância de psicologo fake dao obtida");

        // Criando instâncias de Pessoa
        Pessoa pessoa1 = new Pessoa(getNextId(), "João Silva", "joao@exemplo.com", "123456789", stringToDate("1990-01-01"), "99999-9999", "123.456.789-00");
        Pessoa pessoa2 = new Pessoa(getNextId(), "Maria Oliveira", "maria@exemplo.com", "987654321", stringToDate("1992-02-02"), "88888-8888", "987.654.321-00");

        // Criando instâncias de Psicologo associadas às pessoas
        Psicologo psicologo1 = new Psicologo(getNextId(), pessoa1.getId(), "CRP12345", "Descrição 1");
        Psicologo psicologo2 = new Psicologo(getNextId(), pessoa2.getId(), "CRP67890", "Descrição 2");

        // Adicionando PsicologoFullDTO à lista
        psicologos.add(PsicologoFullDTO.fromPsicologo(psicologo1, pessoa1));
        psicologos.add(PsicologoFullDTO.fromPsicologo(psicologo2, pessoa2));
    }

    @Override
    public int add(AddPsicologoDTO entity) {
        final int id = getNextId();
        entity.setId(id);

        // Criando uma pessoa genérica para o psicólogo
        Pessoa pessoa = new Pessoa(id, entity.getTelefone(), entity.getNome(), entity.getSenha(), entity.getDataNascimento(), entity.getCpf(), entity.getEmail());

        // Criando Psicologo instance
        Psicologo psicologo = new Psicologo(id, pessoa.getId(), entity.getCrp(), entity.getDescricao());

        // Adicionando PsicologoFullDTO à lista
        PsicologoFullDTO psicologoDTO = PsicologoFullDTO.fromPsicologo(psicologo, pessoa);

        // Associando especialidades
        for (String especialidade : entity.getEspecialidades()) {
            // You may need to handle the logic of storing especialidade correctly
            // For the fake DAO, you might just log or manage these associations in a simpler way
            //psicologoDTO.addEspecialidade(especialidade); // Make sure PsicologoFullDTO has this method
        }

        psicologos.add(psicologoDTO);
        return id;
    }

    @Override
    public void remove(int id) {
        psicologos.removeIf(psicologoDTO -> Integer.parseInt(psicologoDTO.getId()) == id);
    }

    @Override
    public PsicologoFullDTO readById(int id) {
        return psicologos.stream().filter(p -> Integer.parseInt(p.getId()) == id).findFirst().orElse(null);
    }

    @Override
    public PsicologoFullDTO readByEmail(String email) {
        return null;
    }

    @Override
    public List<PsicologoFullDTO> readAll() {
        return psicologos;
    }

    @Override
    public void updateInformation(int id, Psicologo entity) {
        PsicologoFullDTO psicologoDTO = readById(id);
        if (psicologoDTO != null) {
            psicologoDTO.setCrp(entity.getCrp());
            psicologoDTO.setDescricao(entity.getDescricao());
        }
    }

    @Override
    public List<PsicologoFullDTO> search(String name, String especialidade) {
        return List.of();
    }

    private Date stringToDate(String dateStr) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return formatter.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException("Erro ao converter data", e);
        }
    }
}
