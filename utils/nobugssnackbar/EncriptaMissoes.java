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
    
		File folder = new File("missionsnobugsj");
		
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        byte[] key = "Y&5v4a9!x#/h3,W?".getBytes();
        
        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES"));

        File[] fs = folder.listFiles();
		for (File f:fs) {
			
	        byte[] arq = new byte[(int)f.length()];
	        BufferedInputStream in = new BufferedInputStream(new FileInputStream(f));
			in.read(arq);
			in.close();

	        byte[] encrypted = cipher.doFinal(arq);
	        
	        String fname = f.getName();
	        
	        fname = fname.substring(0, fname.length()-4) + ".dat"; 
	        
	        System.out.println(fname);
	        
	        File fout = new File("missionscripto/"+fname);
			BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(fout));
			out.write(encrypted);
			out.close();

		}
	}

}
