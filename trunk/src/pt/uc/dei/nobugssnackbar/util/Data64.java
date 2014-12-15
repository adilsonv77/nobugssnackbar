package pt.uc.dei.nobugssnackbar.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.tomcat.util.codec.binary.Base64;

public class Data64 {
	
	public static String encode(File file) throws IOException {
		InputStream in = new FileInputStream(file);
		
		byte[] bytes = new byte[(int) file.length()];
		in.read(bytes);
		in.close();
		
		byte[] encodedBytes = Base64.encodeBase64(bytes);
		return new String(encodedBytes);
	}
	
	public static String encode(byte[] bytes) {
		byte[] encodedBytes = Base64.encodeBase64(bytes);
		return new String(encodedBytes);
	}
	
	public static byte[] decode(String str) {
		return Base64.decodeBase64(str);
	}
	
	public static byte[] decode(byte bytes[]) {
		return Base64.decodeBase64(bytes);
	}
}
