package pt.uc.dei.nobugssnackbar.control;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;

import pt.uc.dei.nobugssnackbar.util.Data64;

@RemoteProxy(scope=ScriptScope.SESSION)
public class Image64 {

	@RemoteMethod
	public void saveImage(String base64) throws FileNotFoundException, IOException {
		byte bytes[] = Data64.decode(base64);
		File file = new File(System.getProperty("user.home") + "\\Desktop\\image.png");
		if (!file.exists()) file.createNewFile();
		OutputStream out = new FileOutputStream(file);
		out.write(bytes);
		out.close();
	}
}
