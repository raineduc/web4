package raineduc.web4.beans.exceptions;

public class AuthException extends Exception {
    private String field;

    public AuthException(String message, String field) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
