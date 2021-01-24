package raineduc.web4.utils.pbkdf2;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

public class PBKDF2SecurePassword implements SecurePassword {
    private final String ALGORITHM = "PBKDF2WithHmacSHA1";
    private final int SALT_BYTES = 20;
    private final int HASH_BYTES = 20;
    private final int ITERATIONS = 300;

    private final int ITERATION_HASH_POSITION = 0;
    private final int SALT_HASH_POSITION = 1;
    private final int HASHED_STRING_POSITION = 2;

    public String hash(String password) throws PasswordHashException {
        try {
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[SALT_BYTES];
            random.nextBytes(salt);
            byte[] hash = pbkdf2(password.toCharArray(), salt, ITERATIONS, HASH_BYTES);

            return ITERATIONS + ":" + toHex(salt) + ":" + toHex(hash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new PasswordHashException("Не удалось захешировать пароль: " + e.getMessage());
        }
    }

    public boolean validatePassword(String incomingPassword, String hashedPassword) throws PasswordHashException {
        try {
            String[] params = hashedPassword.split(":");
            int iterations = Integer.parseInt(params[ITERATION_HASH_POSITION]);
            byte[] salt = byteArrayFromHex(params[SALT_HASH_POSITION]);
            byte[] hash = byteArrayFromHex(params[HASHED_STRING_POSITION]);
            byte[] incomingHash = pbkdf2(incomingPassword.toCharArray(), salt, iterations, hash.length);
            return slowEquals(hash, incomingHash);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new PasswordHashException("Не удалось проверить пароль: " + e.getMessage());
        }
    }

    /**
     * Compares two byte arrays in length-constant time. This comparison method
     * is used so that password hashes cannot be extracted from an on-line
     * system using a timing attack and then attacked off-line.
     * ̶у̶к̶р̶а̶д̶е̶н̶ы̶й̶  позаимствованный метод
     *
     * @param a the first byte array
     * @param b the second byte array
     * @return true if both byte arrays are the same, false if not
     */
    private boolean slowEquals(byte[] a, byte[] b) {
        int diff = a.length ^ b.length;
        for (int i = 0; i < a.length && i < b.length; i++)
            diff |= a[i] ^ b[i];
        return diff == 0;
    }

    public byte[] pbkdf2(char[] password, byte[] salt, int iterations, int bytes) throws NoSuchAlgorithmException, InvalidKeySpecException {
        PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, bytes * 8);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(ALGORITHM);
        return keyFactory.generateSecret(spec).getEncoded();
    }

    private String toHex(byte[] array) {
        BigInteger integer = new BigInteger(1, array);
        String hex = integer.toString(16);
        int leftPaddingLength = (array.length * 2) - hex.length();
        if (leftPaddingLength > 0) {
            return String.format("%0" + leftPaddingLength + "d", 0) + hex;
        }
        return hex;
    }

    private byte[] byteArrayFromHex(String hex) {
        byte[] byteArray = new byte[(hex.length() / 2)];
        for (int i = 0; i < byteArray.length; i++) {
            byteArray[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
        }
        return byteArray;
    }

}
