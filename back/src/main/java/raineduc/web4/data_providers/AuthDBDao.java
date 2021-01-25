package raineduc.web4.data_providers;

import com.sun.istack.Nullable;
import raineduc.web4.beans.AuthDAO;
import raineduc.web4.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

public class AuthDBDao implements AuthDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void addUser(User user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    @Override
    @Nullable
    public User findUser(String login) {
        try {
            return entityManager.createQuery("SELECT user1 FROM User user1 WHERE user1.login = :value1", User.class)
                    .setParameter("value1", login).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
