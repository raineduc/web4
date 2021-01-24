package raineduc.web4.rest_entities;

public class ValidationError extends CommonError {
    private String field;

    public ValidationError(String error, String field) {
        super(error);
        this.field = field;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
