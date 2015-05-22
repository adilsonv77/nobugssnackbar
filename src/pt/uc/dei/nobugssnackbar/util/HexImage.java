package pt.uc.dei.nobugssnackbar.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public class HexImage {
	
	public static String toHex(File file) throws FileNotFoundException, IOException {

		InputStream in = new FileInputStream(file);

		int value = 0;
		StringBuilder result = new StringBuilder();
		while ((value = in.read()) != -1) {
			result.append(String.format("%02X", value));
		}

		in.close();
		return result.toString();
	}
	
	public static byte[] toImage(String hex) throws IOException {		
		int len = hex.length();
		byte[] data = new byte[len / 2];
		for (int i = 0; i < len; i += 2) {
			data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4) + Character.digit(hex.charAt(i+1), 16));
		}
		
		return data;
	}
	
}
