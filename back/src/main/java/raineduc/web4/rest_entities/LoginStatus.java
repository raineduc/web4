package raineduc.web4.rest_entities;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

public class LoginStatus {
    private boolean isLoggedIn;

    public LoginStatus(boolean isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }

    @JsonGetter("isLoggedIn")
    public boolean isLoggedIn() {
        return isLoggedIn;
    }

    @JsonSetter("isLoggedIn")
    public void setLoggedIn(boolean loggedIn) {
        isLoggedIn = loggedIn;
    }
}
