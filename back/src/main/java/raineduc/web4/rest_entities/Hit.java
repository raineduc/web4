package raineduc.web4.rest_entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class Hit {
    @NotNull
    @Min(value = -2)
    @Max(value = 2)
    private double x;

    @NotNull
    @Min(value = -5)
    @Max(value = 5)
    private double y;

    @NotNull
    @Min(value = 0)
    @Max(value = 2)
    private double radius;

    @JsonGetter("x-coord")
    public double getX() {
        return x;
    }

    @JsonGetter("y-coord")
    public double getY() {
        return y;
    }

    public double getRadius() {
        return radius;
    }

    @JsonSetter("x-coord")
    public void setX(double x) {
        this.x = x;
    }

    @JsonSetter("x-coord")
    public void setY(double y) {
        this.y = y;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
