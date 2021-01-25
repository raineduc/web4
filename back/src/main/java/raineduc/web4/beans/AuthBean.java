package raineduc.web4.beans;

import raineduc.web4.beans.exceptions.AuthException;
import raineduc.web4.beans.exceptions.InternalError;
import raineduc.web4.entities.User;
import raineduc.web4.utils.pbkdf2.SecurePassword;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;

@Stateless
public class AuthBean {
    @Inject
    private AuthDAO authDAO;

    @Inject
    private SecurePassword securePassword;

    public String LOGIN_FIELD = "login";
    public String PASSWORD_FIELD = "password";

    public User login(@NotNull String login,@NotNull String password) throws AuthException, InternalError {
        try {
            User user = authDAO.findUser(login);
            if (user == null) {
                throw new AuthException("A user with the specified login does not exist", LOGIN_FIELD);
            }

            if (!securePassword.validatePassword(password, user.getPassword())) {
                throw new AuthException("Wrong password", PASSWORD_FIELD);
            }
            return user;
        } catch (AuthException e) {
            throw e;
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }

    public User register(@NotNull String login, @NotNull String password) throws AuthException, InternalError {
        try {
            if (authDAO.findUser(login) != null) {
                throw new AuthException("This login is already taken", LOGIN_FIELD);
            }
            User user = new User(login, securePassword.hash(password));
            authDAO.addUser(user);
            return user;
        } catch (AuthException e) {
          throw e;
        } catch (Exception e) {
            throw new InternalError(e.getMessage());
        }
    }
}
