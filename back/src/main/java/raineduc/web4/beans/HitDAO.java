package raineduc.web4.beans;

import raineduc.web4.entities.Hit;
import raineduc.web4.entities.User;

import java.util.List;

public interface HitDAO {
    void addHit(Hit hit);
    void clearUserHits(User user);
    List<Hit> getUserHits(String login);
    List<Hit> getUserHits(String login, int limit, int offset);
    long getCountOfHits(String login);
}
