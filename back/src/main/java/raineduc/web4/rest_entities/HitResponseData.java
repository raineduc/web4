package raineduc.web4.rest_entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

public class HitResponseData extends HitRequestData {
    private boolean hit;

    public HitResponseData(double x, double y, double radius, boolean hit) {
        super(x, y, radius);
        this.hit = hit;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    @Override
    @JsonGetter("x")
    public double getX() {
        return super.getX();
    }

    @Override
    @JsonGetter("y")
    public double getY() {
        return super.getY();
    }

    @Override
    @JsonSetter("x")
    public void setX(double x) {
        super.setX(x);
    }

    @Override
    @JsonSetter("y")
    public void setY(double y) {
        super.setY(y);
    }
}
