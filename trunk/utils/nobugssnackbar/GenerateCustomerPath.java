package nobugssnackbar;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class GenerateCustomerPath {

	private static int contaN; 
	
	private static int[] runToCounter(int yd, int numLin, int x, int y, int newY, int c0, StringBuffer n, StringBuffer s, StringBuffer k) {

		int xd = 0;
		for (int i = 1; i <= numLin; i++) {
			createNode(n, contaN + 1, x + (xd * i), y + (yd * i));
			if (c0 > 0 && i == 1) {
				s.append("n" + c0 + ":{n" + (c0 - 1) + ":1, n" + (c0 + 1) + ":1, n" + (contaN + 1) +  ":1}, ");

				s.append("n" + (contaN + 1) + ":{n" + (c0) + ":1, n" + (contaN + 2) + ":1}, ");
			}
			else
				if (i < numLin)
					s.append("n" + (contaN + 1) + ":{n" + (contaN) + ":1, n" + (contaN + 2)
							+ ":1}, ");
			contaN++;
		}

		int c1 = contaN;
		y = newY;
		xd = 3;
		yd = 0;
		for (int i = 1; i < 10; i++) {
			createNode(n, contaN + 1, x + (xd * i), y + (yd * i));
			s.append("n" + (contaN + 1) + ":{n" + (contaN) + ":1, n"
					+ (contaN + 2) + ":1}, ");
			contaN++;
		}

		contaN++;

		k.append("'n" + contaN + "', ");
		int nCounter = contaN;
		createNode(n, nCounter, 44, newY);
		
		return new int[]{c1, nCounter};
		
	}
	
	public static void main(String[] args) throws FileNotFoundException {
		/*
		 * this.path = {n1:{n2:1}, n2:{n1:1}}; 
		 * this.nodes = {n1:{x:, y:}, n2:{x:, y:}}; 
		 * this.keynodes = ['n1', 'n11'];
		 */
		PrintWriter pw = new PrintWriter("customer.txt");

		StringBuffer s = new StringBuffer("CustOpt.path = {");
		StringBuffer n = new StringBuffer("CustOpt.nodes = {");
		StringBuffer k = new StringBuffer("CustOpt.keynodes = [");

		int x = 14, y = 96;
		// where the customer borns
		k.append("'n1', ");
		createNode(n, 1, x, y);

		contaN = 1;

		// in front of counter 1 (44, 290)
		int[] r = runToCounter(6, 32, x, y, 290, 0, n, s, k);
		int c1 = r[0]; int nCounter1 = r[1];
		
		// in front of counter 2 (44, 330)
		r = runToCounter(4, 10, x, 290, 330, c1, n, s, k);
		int c2 = r[0]; int nCounter2 = r[1];

		r = runToCounter(4, 10, x, 330, 370, c2, n, s, k);
		int c3 = r[0]; int nCounter3 = r[1];

		r = runToCounter(4, 10, x, 370, 410, c3, n, s, k);
		int c4 = r[0]; int nCounter4 = r[1];
		s.append("n" + c4 + ":{n" + (c4 - 1) + ":1, n" + (c4 + 1) + ":1}, ");

		// ligacoes entre os nós principais
		s.append("n1:{n2:1}, ");
		s.append("n" + nCounter1 + ":{n" + (nCounter1 - 1) + ":1}, ");
		s.append("n" + nCounter2 + ":{n" + (nCounter2 - 1) + ":1}, ");
		s.append("n" + nCounter3 + ":{n" + (nCounter3 - 1) + ":1}, ");
		s.append("n" + nCounter4 + ":{n" + (nCounter4 - 1) + ":1}, ");



		pw.println(s + "};");
		pw.println(n + "};");
		pw.println(k + "];");

		pw.close();
	}

	private static void createNode(StringBuffer n, int i, int x, int y) {
		n.append("n" + i + ":{id: 'n" + i + "', x:" + x + ", y: " + y + "}, ");

	}
}
