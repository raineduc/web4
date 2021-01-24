package raineduc.web4.beans;

import com.sun.istack.Nullable;
import raineduc.web4.entities.User;

public interface AuthDAO {
    User findUser(String login);
    @Nullable
    void addUser(User user);
}
