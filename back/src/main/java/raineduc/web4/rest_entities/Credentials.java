package raineduc.web4.rest_entities;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Credentials {
    @NotNull(message = "A login must be set")
    @Size(min = 6, message = "The min size of a login must be 6 symbols")
    @Size(max = 25, message = "The max size of a login must be 25 symbols")
    private String login;

    @NotNull(message = "A password must be set")
    @Size(min = 8, message = "The min size of a password must be 8 symbols")
    @Size(max = 40, message = "The max size of a password must be 40 symbols")
    private String password;

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
