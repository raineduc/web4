package raineduc.web4.beans;

import com.sun.istack.Nullable;
import raineduc.web4.entities.User;

public interface AuthDAO {
    @Nullable
    User findUser(String login);
    void addUser(User user);
}
