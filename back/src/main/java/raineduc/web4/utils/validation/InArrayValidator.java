package raineduc.web4.utils.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.stream.DoubleStream;

public class InArrayValidator implements ConstraintValidator<InArray, Double> {
    protected double[] array;

    @Override
    public void initialize(InArray inArray) {
        this.array = inArray.array();
    }

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        return value != null && DoubleStream.of(array).anyMatch(x -> x == value);
    }
}
