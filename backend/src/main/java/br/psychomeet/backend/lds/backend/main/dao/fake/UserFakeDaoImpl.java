package br.psychomeet.backend.lds.backend.main.dao.fake;

import br.psychomeet.backend.lds.backend.main.domain.UserModel;
import br.psychomeet.backend.lds.backend.main.port.dao.user.UserDao;

import java.util.ArrayList;
import java.util.List;

//@Repository
public class UserFakeDaoImpl implements UserDao {

    private static List<UserModel> users = new ArrayList<>();

    private static int ID = 0;

    private int getNextId(){
        ID += 1;
        return ID;
    }

    public UserFakeDaoImpl() {
        System.out.println("Instância de user fake dao obtida");

        UserModel user1 = new UserModel();
        user1.setId(getNextId());
        user1.setEmail("user1@gmail.com");
        user1.setFullName("User 1");
        user1.setPassword("1111");

        UserModel user2 = new UserModel();
        user2.setId(getNextId());
        user2.setEmail("user2@gmail.com");
        user2.setFullName("User 2");
        user2.setPassword("2222");

        UserModel user3 = new UserModel();
        user3.setId(getNextId());
        user3.setEmail("user3@gmail.com");
        user3.setFullName("User 3");
        user3.setPassword("3333");

        UserModel user4 = new UserModel();
        user4.setId(getNextId());
        user4.setEmail("user4@gmail.com");
        user4.setFullName("User 4");
        user4.setPassword("4444");

        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
    }
    @Override
    public int add(UserModel entity) {

        final int id = getNextId();
        entity.setId(id);
        users.add(entity);
        return id;
    }

    @Override
    public void remove(int id) {
        int itemIndex = -1;

        for (int i = 0; i < users.size(); i++){
            UserModel user = users.get(i);
            if (user.getId() == id){
                itemIndex = i;
                break;
            }
        }

        if (itemIndex == -1){
            return;
        }

        UserModel removeEntity = users.remove(itemIndex);
        System.out.println("O usuário " + removeEntity.getFullName() + " foi removido. ID do usuário removido " + removeEntity.getId());

    }

    @Override
    public UserModel readById(int id) {

        for (UserModel user : users){
            if (user.getId() == id){
                return user;
            }
        }
        return null;
    }

    @Override
    public List<UserModel> readAll() {
        return users;
    }

    @Override
    public void updateInformation(int id, UserModel entity) {

        UserModel user = readById(id);
        user.setFullName(entity.getFullName());

    }

    @Override
    public UserModel readByEmail(String email) {
        for (UserModel user : users){
            if (user.getEmail().equalsIgnoreCase(email)){
                return user;
            }
        }
        return null;
    }


    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {
        UserModel user = readById(id);
        user.setPassword(newPassword);
        return true;
    }
}
