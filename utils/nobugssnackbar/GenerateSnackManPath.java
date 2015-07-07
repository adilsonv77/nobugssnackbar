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
		int x = 270, y = 356; //int x = 260, y = 390;
		
		// onde nasce o heroi
		k.append("'n1', ");
		createNode(n, 1, x, y);
		
		int contaN = 1;
		
		int xd = -4, yd = -12;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (i+1) + ":{n"+(i)+":1, n"+(i+2)+":1}, ");
			contaN++;
		}
		
		contaN++;
		// em frente ao display (230, 240) 
		k.append("'n"+contaN+"', ");
		int nDisplay = contaN;
		
		x = 230; y = 240; xd = -12; yd = 3;
		createNode(n, contaN, x, y);
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		contaN++;
		
		// em frente ao customer 1 (110, 276) 
		int nC1 = contaN;
		k.append("'n"+nC1+"', ");
		
		// de c1 a c2  (110,276) -> (110, 356)  
		x = 110; y = 276; xd = 0; yd = +8;
		createNode(n, contaN, x, y);
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n"+(contaN+2)+":0.5}, ");
			contaN++;
		}
		contaN++;

		// em frente ao customer 2 (110, 356) 
		k.append("'n"+contaN+"', ");
		int nC2 = contaN;
		x = 110; y = 356; xd = +12; yd = -11; 
		createNode(n, nC2, x, y);
		
		// do nC2 até display (110,356)->(230, 240) 
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 9) {
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(nDisplay)+":1}, ");
			} else
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			contaN++;
		}
		int nC2_Display = contaN;
		
        // 270, 356				
		xd = 8; yd = 0;
		// do nC2 até ponto de origem (110,356) -> (270, 356) 
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

		// em frente ao cooler (284, 438) 
		x = 270; y = 356; xd = +1; yd = +8;
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
		createNode(n, nCooler, 284, 438);
		k.append("'n"+nCooler+"', ");
		
		// do c2 a c3 (110, 356) -> (110, 436) 
		xd = 0; yd = +8; x = 110; y = 356;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1)
			  s.append("n" + (contaN+1) + ":{n"+(nC2)+":0.5, n"+(contaN+2)+":0.5}, ");
			else
			  s.append("n" + (contaN+1) + ":{n"+(contaN)+":0.5, n"+(contaN+2)+":0.5}, ");
			
			contaN++;
		}
		int nC3 = contaN+1;
		k.append("'n"+nC3+"', ");
		createNode(n, nC3, 110, 436);
		contaN++;
		
		
		// do c3 ao ponto origem (110, 436) -> (270, 356)
		int nC3_Origem = contaN+1;
		x = 110; y= 436;
		xd = 8; yd = -4;
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
		
		// do c3 ao BoxOfFruits (110, 436) -> (200, 416)
		int nC3_BoxOfFruits = contaN+1;
		x = 110; y= 436;
		xd = 15; yd = -3;
		
		for (int i=1; i<=6; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nC3)+":1, n"+(contaN+2)+":1}, ");
			} else {
				s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}
		int nBoxOfFruits = contaN+1;
		k.append("'n"+nBoxOfFruits+"', ");
		createNode(n, nBoxOfFruits, 200, 416);
		contaN++;
		
		// do boxoffruits ao ponto origem (200, 416) -> (270, 356)
		int nBoxOfFruits_Origem = contaN+1;
		x = 200; y= 416;
		xd = 7; yd = -6;
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nBoxOfFruits)+":1, n"+(contaN+2)+":1}, ");
			} else {
				if (i == 10) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n1:1}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}
		
		// do BoxOfFruits ao Cooler (200, 416) -> (284, 438)
		int boxOfFruits_Cooler = contaN+1;
		x = 200; y= 416;
		xd = 8; yd = 2;
		
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nBoxOfFruits)+":1, n"+(contaN+2)+":1}, ");
			} else {
				if (i == 10) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(nCooler)+":1}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}

		// juice machine
		
		int nJuiceMachine = contaN+1;
		k.append("'n"+nJuiceMachine+"', ");
		createNode(n, nJuiceMachine, 300, 240);
		contaN++;

		// da maquina de sumos ao ponto de origem   (300, 240) -> (260, 356)
		int nJuiceMachine_Origem = contaN+1;
		x = 300; y = 240;
		xd = -4; yd = 11;
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nJuiceMachine)+":1, n"+(contaN+2)+":1}, ");
			} else {
				if (i == 10) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n1:1}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}		
		
		// da maquina de sumos ao display (300, 240) -> (230, 240)
		int nJuiceMachine_Display = contaN+1;
		x = 300; y= 240;
		xd = -7; yd = 0;
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				s.append("n" + (contaN+1) + ":{n"+(nJuiceMachine)+":1, n"+(contaN+2)+":1}, ");
			} else {
				if (i == 10) {
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(nDisplay)+":1}, ");
				} else
					s.append("n" + (contaN+1) + ":{n"+(contaN)+":1, n"+(contaN+2)+":1}, ");
			}
			contaN++;
		}		
		
		// ligacoes entre os nós principais
		s.append("n1:{n2:1, n"+nC2_Origem+":1, n"+(nC2_Origem+1)+":1, n"+(nC3_Origem+19)+":1,"
				+ " n"+(nBoxOfFruits_Origem+9)+":1, n" + (nJuiceMachine_Origem+9) + ":1}, ");
		s.append("n" + (nDisplay) + ":{n"+(nDisplay-1)+":1, n"+(nDisplay + 1)+":1, n"+(nC2_Display)+":1, n"+(nJuiceMachine_Display+9) + ":1 }, ");
		s.append("n" + (nC1) + ":{n"+(nC1-1)+":1, n"+(nC1+1)+":1}, ");
		s.append("n" + (nC2) + ":{n"+(nC2-1)+":1, n"+(nC2+1)+":1, n"+(nC2_Display+1)+":1, n"+(nC3-9)+":1}, ");
		s.append("n" + (nC3) + ":{n"+(nC3-1)+":1, n"+(nC3+1)+":1, n"+nC3_Origem+":1, n"+nC3_BoxOfFruits+":1}, ");
		s.append("n" + (nBoxOfFruits) + ":{n"+(nBoxOfFruits-1)+":1, n"+(nBoxOfFruits+1) + ":1, n"+(boxOfFruits_Cooler)+":1}, ");
		s.append("n" + (nJuiceMachine) + ":{n"+(nJuiceMachine_Origem)+":1, n"+(nJuiceMachine_Display) + ":1}, ");
		s.append("n" + (nCooler) + ":{n"+(nCooler-1)+":1, n"+(boxOfFruits_Cooler+9)+":1} ");

		/*
		s.append("n1:{n2:1, n"+nC2_Origem+":1, n"+(nC2_Origem+1)+":1, n"+(nC3_Origem+19)+":1, n"+(nC4_Origem+19)+":1,"
				+ " n"+(nBoxOfFruits_Origem+9)+":1, n" + (nJuiceMachine_Origem+9) + ":1}, ");
		s.append("n" + (nDisplay) + ":{n"+(nDisplay-1)+":1, n"+(nDisplay + 1)+":1, n"+(nC2_Display)+":1, n"+(nJuiceMachine_Display+9) + ":1 }, ");
		s.append("n" + (nC1) + ":{n"+(nC1-1)+":1, n"+(nC1+1)+":1}, ");
		s.append("n" + (nC2) + ":{n"+(nC2-1)+":1, n"+(nC2+1)+":1, n"+(nC2_Display+1)+":1, n"+(nC3-9)+":1}, ");
		s.append("n" + (nC3) + ":{n"+(nC3-1)+":1, n"+(nC3+1)+":1, n"+nC3_Origem+":1}, ");
		s.append("n" + (nC4) + ":{n"+(nC4-1)+":1, n"+nC4_Origem+":1, n"+nC4_BoxOfFruits+":1}, ");
		s.append("n" + (nBoxOfFruits) + ":{n"+(nBoxOfFruits-1)+":1, n"+(nBoxOfFruits+1) + ":1}, ");
		s.append("n" + (nJuiceMachine) + ":{n"+(nJuiceMachine_Origem)+":1, n"+(nJuiceMachine_Display) + ":1}, ");
		s.append("n" + (nCooler) + ":{n"+(nCooler-1)+":1} ");
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
