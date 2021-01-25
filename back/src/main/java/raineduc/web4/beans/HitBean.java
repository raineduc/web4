package raineduc.web4.beans;

import raineduc.web4.beans.exceptions.InternalError;
import raineduc.web4.entities.Hit;
import raineduc.web4.entities.User;

import javax.inject.Inject;

import java.util.List;

import static java.lang.Math.pow;

public class HitBean {
    @Inject
    private HitDAO hitDAO;

    public Hit addHit(double x, double y, double radius, User user) throws InternalError {
        try {
            boolean isHit = isHitSuccessful(x, y, radius);
            Hit hit = new Hit(x, y, radius, isHit);
            hit.setOwner(user);
            hitDAO.addHit(hit);
            return hit;
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public List<Hit> getHits(String userLogin) {
        try {
            List<Hit> hits = hitDAO.getUserHits(userLogin);
            return hits;
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public List<Hit> getHits(String userLogin, int limit, int offset) {
        try {
            List<Hit> hits = hitDAO.getUserHits(userLogin, limit, offset);
            return hits;
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public long getCountOfHits(String userLogin) {
        try {
            return hitDAO.getCountOfHits(userLogin);
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public void clear(User owner) {
        try {
            hitDAO.clearUserHits(owner);
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public boolean isHitSuccessful(double x, double y, double radius) {
        return checkSquareArea(x, y, radius) || checkCircleArea(x, y, radius) || checkTriangleArea(x, y, radius);
    }

    protected boolean checkSquareArea(double x, double y, double radius) {
        return (x >= 0 && x <= radius) && (y >= 0 && y <= radius);
    }

    protected boolean checkTriangleArea(double x, double y, double radius) {
        return (x <= 0) && (y >= 0) && (y <= radius + x);
    }

    protected boolean checkCircleArea(double x, double y, double radius) {
        return (x >= 0) && (y <= 0) && (pow(x, 2) + pow(y, 2) <= radius / 2);
    }
}
