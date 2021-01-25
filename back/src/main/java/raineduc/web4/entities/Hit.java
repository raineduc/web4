package raineduc.web4.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Hit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @Column(nullable = false)
    private double radius;

    @Column(nullable = false)
    private boolean isHit;

    @ManyToOne
    @JoinColumn(name = "owner", referencedColumnName = "login")
    private User owner;

    public Hit() {}

    public Hit(double x, double y, double radius, boolean isHit) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.isHit = isHit;
    }

    public Hit(double x, double y, double radius, boolean isHit, User user) {
        this(x, y, radius, isHit);
        this.owner = user;
    }

    public Integer getId() {
        return id;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public User getOwner() {
        return owner;
    }

    public double getRadius() {
        return radius;
    }

    public boolean isHit() {
        return isHit;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public void setHit(boolean hit) {
        isHit = hit;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
