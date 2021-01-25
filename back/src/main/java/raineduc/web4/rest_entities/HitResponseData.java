package raineduc.web4.rest_entities;

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
}
