package pt.uc.dei.nobugssnackbar.util;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.awt.image.WritableRaster;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigInteger;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import org.eclipse.jdt.internal.compiler.parser.Scanner;

public class Image {
	
	public static String toHex(File file) throws FileNotFoundException, IOException {

		InputStream in = new FileInputStream(file);

		int value = 0;
		StringBuilder result = new StringBuilder();
		while ((value = in.read()) != -1) {
			result.append(String.format("%02X", value));
		}

		return result.toString();
	}
	
	public static File toImage(String hex, String filename, String filetype) throws IOException {
		int len = hex.length();
		byte[] data = new byte[len / 2];
		for (int i = 0; i < len; i += 2) {
			data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4) + Character.digit(hex.charAt(i+1), 16));
		}
		
		//Here are creating a temporary file, but this can be changed
		File image = File.createTempFile(filename, "." + filetype);
		
		OutputStream out = new FileOutputStream(image);
		out.write(data);
		out.close();
		
		return image;
	}
	
	//Test function, it's functional :)
	public static void main(String... args) throws Exception {
		File file = new File("C:\\DSC00919.JPG");
		
		String hex = toHex(file);
		
		File file2 = toImage(hex, "image", "jpg");
		
		System.out.println("FILE: " + file2.getAbsolutePath());
		
	}
}
