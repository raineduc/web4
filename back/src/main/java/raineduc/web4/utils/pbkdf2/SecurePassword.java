package raineduc.web4.utils.pbkdf2;

public interface SecurePassword {
    String hash(String pass) throws PasswordHashException;
    boolean validatePassword(String incomingPassword, String hashedPassword) throws PasswordHashException;
}
