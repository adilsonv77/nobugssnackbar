package pt.uc.dei.nobugssnackbar.servlets;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HintImage extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		System.out.println(request.getPathInfo());
		
		InputStream in = new FileInputStream("D:/doutoramento/nobugssnackbar/web/images/_unlock.png");
		
		int len = 2048; 
		byte[] dados = new byte[len];
		for (int index = 0; index < dados.length; index++)
        {
			int l = in.read();
			if (l == -1) {
				len = index;
				break;
			}
			
            dados[index] = (byte) l; 
        }
		in.close();

		dados = Arrays.copyOf(dados, len);
		
		response.setContentLength(len);
		response.setContentType("image/png");
		OutputStream out = response.getOutputStream();
		out.write(dados);
		out.close();
	}	
	
}
