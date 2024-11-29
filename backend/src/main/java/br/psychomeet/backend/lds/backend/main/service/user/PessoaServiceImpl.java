package br.psychomeet.backend.lds.backend.main.service.user;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.dao.user.PessoaDao;
import br.psychomeet.backend.lds.backend.main.port.service.user.PessoaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaServiceImpl implements PessoaService {

    private final PessoaDao pessoaDao;

    public PessoaServiceImpl(PessoaDao pessoaDao) {
        this.pessoaDao = pessoaDao;
    }

    @Override
    public int create(Pessoa entity) {
        if (entity == null) {
            return 0;
        }

        if (entity.getNome().isEmpty() || entity.getSenha().isEmpty() || entity.getEmail().isEmpty()) {
            return 0;
        }

        return pessoaDao.add(entity);
    }

    @Override
    public void delete(int id) {
        if (id < 0) {
            return;
        }
        pessoaDao.remove(id);
    }

    @Override
    public Pessoa findById(int id) {
        if (id < 0) {
            return null;
        }
        return pessoaDao.readById(id);
    }

    @Override
    public List<Pessoa> findAll() {
        System.out.println("Find all foi chamado");
        return pessoaDao.readAll();
    }

    @Override
    public void update(int id, Pessoa entity) {
        Pessoa pessoa = findById(id);
        if (pessoa == null) {
            return;
        }
        pessoaDao.updateInformation(id, entity);
    }

    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {
        Pessoa pessoa = findById(id);
        if (pessoa == null) {
            return false;
        }
        if (!pessoa.getSenha().equals(oldPassword)) {
            return false;
        }
        return pessoaDao.updatePassword(id,oldPassword, newPassword);
    }

    @Override
    public Pessoa findByEmail(String email) {
        if (email.isEmpty()) {
            return null;
        }
        return pessoaDao.readByEmail(email);
    }

    @Override
    public void updateFoto(int id, byte[] foto) {
        Pessoa pessoa = findById(id);
        if (pessoa == null) {
            throw new RuntimeException("Pessoa não encontrada para atualizar a foto");
        }
        pessoaDao.updateFoto(id, foto);
    }

    @Override
    public byte[] getFoto(int id) {
        return pessoaDao.readFotoById(id);
    }
}


