package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.Pessoa;
import br.psychomeet.backend.lds.backend.main.port.dao.user.PessoaDao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

//@Repository
public class PessoaFakeDaoImpl implements PessoaDao {

    private static List<Pessoa> pessoas = new ArrayList<>();

    private static int ID = 0;

    private int getNextId() {
        ID += 1;
        return ID;
    }

    public PessoaFakeDaoImpl() {
        System.out.println("Instância de pessoa fake dao obtida");

        Pessoa pessoa1 = new Pessoa();
        pessoa1.setId(getNextId());
        pessoa1.setTelefone("99999-1111");
        pessoa1.setNome("Pessoa 1");
        pessoa1.setSenha("senha1");
        pessoa1.setDataNascimento(new Date(90, 10, 25)); // Example date of birth (YYYY, MM, DD)
        pessoa1.setCpf("111.111.111-11");
        pessoa1.setEmail("pessoa1@gmail.com");

        Pessoa pessoa2 = new Pessoa();
        pessoa2.setId(getNextId());
        pessoa2.setTelefone("99999-2222");
        pessoa2.setNome("Pessoa 2");
        pessoa2.setSenha("senha2");
        pessoa2.setDataNascimento(new Date(85, 5, 12));
        pessoa2.setCpf("222.222.222-22");
        pessoa2.setEmail("pessoa2@gmail.com");

        Pessoa pessoa3 = new Pessoa();
        pessoa3.setId(getNextId());
        pessoa3.setTelefone("99999-3333");
        pessoa3.setNome("Pessoa 3");
        pessoa3.setSenha("senha3");
        pessoa3.setDataNascimento(new Date(92, 2, 5));
        pessoa3.setCpf("333.333.333-33");
        pessoa3.setEmail("pessoa3@gmail.com");

        Pessoa pessoa4 = new Pessoa();
        pessoa4.setId(getNextId());
        pessoa4.setTelefone("99999-4444");
        pessoa4.setNome("Pessoa 4");
        pessoa4.setSenha("senha4");
        pessoa4.setDataNascimento(new Date(88, 11, 22));
        pessoa4.setCpf("444.444.444-44");
        pessoa4.setEmail("pessoa4@gmail.com");

        pessoas.add(pessoa1);
        pessoas.add(pessoa2);
        pessoas.add(pessoa3);
        pessoas.add(pessoa4);
    }


    @Override
    public int add(Pessoa entity) {
        final int id = getNextId();
        entity.setId(id);
        pessoas.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        int itemIndex = -1;

        for (int i = 0; i < pessoas.size(); i++) {
            Pessoa pessoa = pessoas.get(i);
            if (pessoa.getId() == id) {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex == -1) {
            return;
        }

        Pessoa removedPessoa = pessoas.remove(itemIndex);
        System.out.println("A pessoa " + removedPessoa.getNome() + " foi removida. ID da pessoa removida: " + removedPessoa.getId());
    }

    @Override
    public Pessoa readById(int id) {
        for (Pessoa pessoa : pessoas) {
            if (pessoa.getId() == id) {
                return pessoa;
            }
        }
        return null;
    }

    @Override
    public List<Pessoa> readAll() {
        return pessoas;
    }

    @Override
    public void updateInformation(int id, Pessoa entity) {
        Pessoa pessoa = readById(id);
        pessoa.setNome(entity.getNome());
        pessoa.setTelefone(entity.getTelefone());
        pessoa.setSenha(entity.getSenha());
        pessoa.setCpf(entity.getCpf());
        pessoa.setEmail(entity.getEmail());
        pessoa.setDataNascimento(entity.getDataNascimento());
    }

    @Override
    public Pessoa readByEmail(String email) {
        for (Pessoa user : pessoas){
            if (user.getEmail().equalsIgnoreCase(email)){
                return user;
            }
        }
        return null;
    }



    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {
        Pessoa pessoa = readById(id);
        if (pessoa != null) {
            pessoa.setSenha(newPassword);
            return true;
        }
        return false;
    }
}
