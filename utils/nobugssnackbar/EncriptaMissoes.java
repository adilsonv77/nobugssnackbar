package nobugssnackbar;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class EncriptaMissoes {

	public static void main(String[] args) throws NoSuchAlgorithmException, NoSuchPaddingException, IOException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
    
		File f = new File("missionsnobugsj/mission01.xml");
        byte[] arq = new byte[(int)f.length()];
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(f));
		in.read(arq);
		in.close();

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        byte[] key = "Y&5v4a9!x#/h3,W?".getBytes();
        
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES"));
        byte[] encrypted = cipher.doFinal(arq);
        
        File fout = new File("missionscripto/mission01.dat");
		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(fout));
		out.write(encrypted);
		out.close();

	}

}
