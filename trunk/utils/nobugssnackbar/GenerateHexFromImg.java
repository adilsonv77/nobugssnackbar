package nobugssnackbar;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import pt.uc.dei.nobugssnackbar.util.HexImage;

public class GenerateHexFromImg {

	public static void main(String[] args) throws FileNotFoundException, IOException {
		File file = new File("./missions/imagens/askforfood.png");
		System.out.println(HexImage.toHex(file));

	}


}
