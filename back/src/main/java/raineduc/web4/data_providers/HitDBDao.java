package raineduc.web4.data_providers;

import raineduc.web4.beans.HitDAO;
import raineduc.web4.entities.Hit;
import raineduc.web4.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

public class HitDBDao implements HitDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void addHit(Hit hit) {
        entityManager.persist(hit);
        entityManager.flush();
    }

    @Override
    public List<Hit> getUserHits(String login) {
        return entityManager.createQuery("SELECT hit FROM Hit hit WHERE hit.owner.login = :login", Hit.class)
                .setParameter("login", login)
                .getResultList();
    }

    @Override
    public List<Hit> getUserHits(String login, int limit, int offset) {
        return entityManager.createQuery("SELECT hit FROM Hit hit WHERE hit.owner.login = :login" +
                " ORDER BY hit.id desc", Hit.class)
                .setParameter("login", login)
                .setMaxResults(limit)
                .setFirstResult(offset)
                .getResultList();
    }

    @Override
    public long getCountOfHits(String login) {
        return entityManager.createQuery("SELECT count(*) FROM Hit hit WHERE hit.owner.login = :login", Long.class)
                .setParameter("login", login)
                .getSingleResult();
    }

    @Override
    @Transactional
    public void clearUserHits(User owner) {
        entityManager.createQuery("DELETE FROM Hit hit WHERE hit.owner = :owner")
                .setParameter("owner", owner)
                .executeUpdate();
    }
}
