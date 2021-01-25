package raineduc.web4.rest_entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import raineduc.web4.utils.validation.InArray;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class HitRequestData {
    @NotNull
    @Min(value = -2)
    @Max(value = 2)
    private Double x;

    @NotNull
    @Min(value = -5)
    @Max(value = 5)
    private Double y;

    @NotNull
    @InArray(array = {0, 0.5, 1, 1.5, 2}, message = "The radius must be one of the values: 0, 0.5, 1, 1.5, 2")
    private Double radius;

    public HitRequestData() {}

    public HitRequestData(double x, double y, double radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

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

    @JsonSetter("y-coord")
    public void setY(double y) {
        this.y = y;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
