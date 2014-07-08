package nobugssnackbar;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class GenerateCustomerPath {

	public static void main(String[] args) throws FileNotFoundException {
		/*
		 * this.path = {n1:{n2:1}, n2:{n1:1}};
		 * this.nodes = {n1:{x:, y:}, n2:{x:, y:}};
		 * this.keynodes = ['n1', 'n11'];
		 * 
		 */
				PrintWriter pw = new PrintWriter("customer.txt");
				
				StringBuffer s = new StringBuffer("this.path = {");
				StringBuffer n = new StringBuffer("this.nodes = {");
				StringBuffer k = new StringBuffer("this.keynodes = [");
				
				int x = 14, y = 96;
				// where the customer borns
				k.append("'n1', ");
				createNode(n, 1, x, y);
				
				int contaN = 1;
				
				int xd = 0, yd = 9;
				for (int i=1; i<30; i++) {
					createNode(n, contaN+1, x+(xd*i), y+(yd*i));
					s.append("n" + (contaN+1) + ":{n"+(i)+":1, n"+(i+2)+":1}, ");
					contaN++;
				}
				
				y = 366;
				xd = 3; yd = 0;
				for (int i=1; i<10; i++) {
					createNode(n, contaN+1, x+(xd*i), y+(yd*i));
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
					contaN++;
				}
				
				contaN++;
				// in front of counter 1 (50, 370)
				k.append("'n"+contaN+"', ");
				int nCounter1 = contaN;
				createNode(n, nCounter1, 50, 370);
				
				// ligacoes entre os nós principais
				s.append("n1:{n2:1}, ");
				s.append("n"+nCounter1+":{n"+(nCounter1-1)+":1}, ");
				
				pw.println(s + "};");
				pw.println(n + "};");
				pw.println(k + "];");
				
				pw.close();
	}

	private static void createNode(StringBuffer n, int i, int x, int y) {
		n.append("n" + i + ":{id: 'n"+i+"', x:" + x + ", y: " + y + "}, ");

		
	}
}
