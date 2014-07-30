package nobugssnackbar;

import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class GenerateSnackManPath {

	public static void main(String[] args) throws FileNotFoundException {
/*
 * this.path = {n1:{n2:1}, n2:{n1:1}};
 * this.nodes = {n1:{x:, y:}, n2:{x:, y:}};
 * this.keynodes = ['n1', 'n11'];
 * 
 */
		PrintWriter pw = new PrintWriter("snackman.txt");
		
		StringBuffer s = new StringBuffer("this.path = {");
		StringBuffer n = new StringBuffer("this.nodes = {");
		StringBuffer k = new StringBuffer("this.keynodes = [");
		int x = 260, y = 390;
		
		// onde nasce o heroi
		k.append("'n1', ");
		createNode(n, 1, x, y);
		
		int contaN = 1;
		
		int xd = -9, yd = -10;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (i+1) + ":{n"+(i)+":1, n"+(i+2)+":1}, ");
			contaN++;
		}
		
		contaN++;
		// em frente ao display (170, 290)
		k.append("'n"+contaN+"', ");
		int nDisplay = contaN;
		
		x = 170; y = 290; xd = -7; yd = 0;
		createNode(n, contaN, x, y);
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		contaN++;
		
		// em frente ao customer 1 (100, 290)
		int nC1 = contaN;
		k.append("'n"+nC1+"', ");
		
		// de c1 a c2 (100,290) -> (100,330)
		x = 100; y = 290; xd = 0; yd = +4;
		createNode(n, contaN, x, y);
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		contaN++;

		// em frente ao customer 2 (100, 330)
		k.append("'n"+contaN+"', ");
		int nC2 = contaN;
		x = 100; y = 330; xd = +7; yd = -4; 
		createNode(n, nC2, x, y);
		
		// do nC2 até display (100,330)->(170,290)
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 9) {
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(nDisplay)+":1}, ");
			} else
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		int nC2_Display = contaN;
		
        // 260, 390				
		xd = 8; yd = +3;
		// do nC2 até ponto de origem (100,330)->(260, 390)
		for (int i=1; i<20; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			// o custo ficou em 0.5 para dar uma chance a esse caminho
			if (i == 19) {
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n"+(1)+":0.5}, ");
			} else
				if (i == 1)
					s.append("n" + (contaN+1) + ":{n"+(nC2)+":0.5, n"+(contaN+2)+":0.5}, ");
				else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n"+(contaN+2)+":0.5}, ");
			contaN++;
		}
		int nC2_Origem = contaN;
		
		// em frente ao cooler (300, 430)
		x = 260; y = 390; xd = +4; yd = +4;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1)
				s.append("n" + (contaN+1) + ":{n1:1, n"+(contaN+2)+":1}, ");
			else
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		contaN++;
		int nCooler = contaN;
		createNode(n, nCooler, 300, 430);
		k.append("'n"+nCooler+"', ");
		
		// do c2 a c3 (100, 330) -> (100, 370)
		xd = 0; yd = +4; x = 100; y = 330;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1)
			  s.append("n" + (contaN+1) + ":{n"+(nC2)+":1, n"+(contaN+2)+":1}, ");
			else
			  s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			
			contaN++;
		}
		int nC3 = contaN+1;
		k.append("'n"+nC3+"', ");
		createNode(n, contaN+1, 100, 370);
		contaN++;
		
		// do c3 ao c4 (100, 370) -> (100, 410)
		x = 100; y = 370;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		int nC4 = contaN+1;
		k.append("'n"+nC4+"', ");
		createNode(n, contaN+1, 100, 410);
		contaN++;
		
		// do c3 ao ponto origem (100, 370) -> (260, 390)
		int nC3_Origem = contaN+1;
		x = 100; y= 370;
		xd = 8; yd = 1;
		for (int i=1; i<=20; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nC3)+":0.5, n"+(contaN+2)+":0.5}, ");
			} else {
				if (i == 20) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n1:0.5}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n"+(contaN+2)+":0.5}, ");
			}
			contaN++;
		}
		
		// do c4 ao ponto origem (100, 410) -> (260, 390)
		int nC4_Origem = contaN+1;
		x = 100; y= 410;
		xd = 8; yd = -1;
		for (int i=1; i<=20; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nC4)+":1, n"+(contaN+2)+":1}, ");
			} else {
				if (i == 20) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n1:1}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}
		
		// ligacoes entre os nós principais
		s.append("n1:{n2:1, n"+nC2_Origem+":1, n"+(nC2_Origem+1)+":1, n"+(nC3_Origem+19)+":1, n"+(nC4_Origem+19)+":1}, ");
		s.append("n" + (nDisplay) + ":{n"+(nDisplay-1)+":1, n"+(nDisplay + 1)+":1, n"+(nC2_Display)+":1 }, ");
		s.append("n" + (nC1) + ":{n"+(nC1-1)+":1, n"+(nC1+1)+":1}, ");
		s.append("n" + (nC2) + ":{n"+(nC2-1)+":1, n"+(nC2+1)+":1, n"+(nC2_Display+1)+":1, n"+(nC3-9)+":1}, ");
		s.append("n" + (nC3) + ":{n"+(nC3-1)+":1, n"+(nC3+1)+":1, n"+nC3_Origem+":1}, ");
		s.append("n" + (nC4) + ":{n"+(nC4-1)+":1, n"+nC4_Origem+":1}, ");
		s.append("n" + (nCooler) + ":{n"+(nCooler-1)+":1} ");
		
		/*node = new Node(110, 370);
		snackManFinalPath[3] = node;
		
		node = new Node(170, 415);
		snackManFinalPath[4] = node;
*/
		
		pw.println(s + "};");
		pw.println(n + "};");
		pw.println(k + "];");
		
		pw.close();
		
	}

	private static void createNode(StringBuffer n, int i, int x, int y) {
		n.append("n" + i + ":{id: 'n"+i+"', x:" + x + ", y: " + y + "}, ");

		
	}

}
