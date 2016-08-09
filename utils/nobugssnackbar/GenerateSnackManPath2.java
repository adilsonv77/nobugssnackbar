package nobugssnackbar;

import java.awt.Point;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class GenerateSnackManPath2 {

	public static void main(String[] args) throws FileNotFoundException {
/*
 * this.path = {n1:{n2:1}, n2:{n1:1}};
 * this.nodes = {n1:{x:, y:}, n2:{x:, y:}};
 * this.keynodes = ['n1', 'n11'];
 * 
 */
		PrintWriter pw = new PrintWriter("snackman2.txt");
		
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
			createAresta(s, i+1, i, 2, i+2, 2);
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
			createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
			createAresta(s, contaN+1, contaN, 1, contaN+2, 1);
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
				createAresta(s, contaN+1, contaN, 2, nDisplay, 2);
			} else
				createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
				createAresta(s, contaN+1, contaN, 1, 1, 1);
			} else
				if (i == 1)
					createAresta(s, contaN+1, nC2, 1, contaN+2, 1);
				else
					createAresta(s, contaN+1, contaN, 1, contaN+2, 1);
			contaN++;
		}
		int nC2_Origem = contaN;

		// em frente ao cooler (284, 438) 
		x = 270; y = 356; xd = +1; yd = +8;
		for (int i=1; i<10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1)
				createAresta(s, contaN+1, 1, 2, contaN+2, 2);
			else
				createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
				createAresta(s, contaN+1, nC2, 1, contaN+2, 1);
			else
				createAresta(s, contaN+1, contaN, 1, contaN+2, 1);
			
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
				createAresta(s, contaN+1, nC3, 1, contaN+2, 1);
			} else {
				if (i == 20) {
					createAresta(s, contaN+1, contaN, 1, 1, 1);
				} else
					createAresta(s, contaN+1, contaN, 1, contaN+2, 1);
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
				createAresta(s, contaN+1, nC3, 2, contaN+2, 2);
			} else {
				createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
				createAresta(s, contaN+1, nBoxOfFruits, 2, contaN+2, 2);
			} else {
				if (i == 10) {
					createAresta(s, contaN+1, contaN, 2, 1, 2);
				} else
					createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
				createAresta(s, contaN+1, nBoxOfFruits, 2, contaN+2, 2);
			} else {
				if (i == 10) {
					createAresta(s, contaN+1, contaN, 2, nCooler, 2);
				} else
					createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
			}
			contaN++;
		}

		// juice machine
		
		int nJuiceMachine = contaN+1;
		k.append("'n"+nJuiceMachine+"', ");
		createNode(n, nJuiceMachine, 290, 245);
		contaN++;

		// da maquina de sumos ao ponto de origem   (290, 245) -> (260, 356)
		int nJuiceMachine_Origem = contaN+1;
		x = 290; y = 245;
		xd = -3; yd = 11;
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				createAresta(s, contaN+1, nJuiceMachine, 2, contaN+2, 2);
			} else {
				if (i == 10) {
					createAresta(s, contaN+1, contaN, 2, 1, 2);
				} else
					createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
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
				createAresta(s, contaN+1, nJuiceMachine, 2, contaN+2, 2);
			} else {
				if (i == 10) {
					createAresta(s, contaN+1, contaN, 2, nDisplay, 2);
				} else
					createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
			}
			contaN++;
		}		
		
		// da saida do balcao até a origem (258, 180) -> (260, 356)
		int nSaidaBalcao = contaN+1; 
		createNode(n, contaN+1, 258, 180);
		
		contaN++;
		createNode(n, contaN+1, 258, 196);
		createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
		
		contaN++;
		x = 260; y = 196;
		xd = 0; yd = 16;
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 10) {
				createAresta(s, contaN+1, contaN, 2, 1, 2);
			} else
				createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
			contaN++;
		}	

		int nSaidaBalcao2 = contaN;
		
		createAresta(s, nSaidaBalcao, contaN+1, 2, nSaidaBalcao+1, 2);
		// da saida do balcao até table 2 (258, 180) -> (240, 144)
		x = 258; y = 180;
		xd = -2; yd = -4;
		for (int i=1; i<=9; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			if (i == 1) {
				createAresta(s, contaN+1, nSaidaBalcao, 2, contaN+2, 2);
			} else
				createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
			contaN++;
		}	
		
		int nTable2 = contaN;
		k.append("'n"+nTable2+"', ");
		
		// do table 2 até table 1 (240, 144) -> (200, 144)
		y = 144; x = 240;
		yd = 0; xd = -4; 
		for (int i=1; i<=10; i++) {
			createNode(n, contaN+1, x+(xd*i), y+(yd*i));
			createAresta(s, contaN+1, contaN, 2, contaN+2, 2);
			contaN++;
		}	
		int nTable1 = contaN;
		k.append("'n"+nTable1+"', ");
		
		// ligacoes entre os nós principais
		createAresta(s, 1, 2, 2, nC2_Origem, 2);
		createAresta(s, 1, nC2_Origem+1, 2, nC3_Origem+19, 2);
		createAresta(s, 1, nBoxOfFruits_Origem+9, 2, nJuiceMachine_Origem+9, 2);
		createAresta(s, 1, nSaidaBalcao2, 2);

		createAresta(s, nDisplay, nDisplay-1, 2, nDisplay+1, 2);
		createAresta(s, nDisplay, nC2_Display, 2, nJuiceMachine_Display+9, 2);

		createAresta(s, nC1, nC1-1, 2, nC1+1, 2);
		
		createAresta(s, nC2, nC2-1, 2, nC2+1, 2);
		createAresta(s, nC2, nC2_Display+1, 2, nC3-9, 2);

		createAresta(s, nC3, nC3-1, 2, nC3+1, 2);
		createAresta(s, nC3, nC3_Origem, 2, nC3_BoxOfFruits, 2);

		createAresta(s, nBoxOfFruits, nBoxOfFruits-1, 2, nBoxOfFruits+1, 2);
		createAresta(s, nBoxOfFruits, boxOfFruits_Cooler, 2);

		createAresta(s, nJuiceMachine, nJuiceMachine_Origem, 2, nJuiceMachine_Display, 2);
		createAresta(s, nCooler, nCooler-1, 2, boxOfFruits_Cooler+9, 2);

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

	private static void createAresta(StringBuffer s, int i, int i2, int w1) {
		s.append("graph.addAresta("+w1+", \"n"+i+"\", \"n"+i2+"\");");
		
	}

	private static void createAresta(StringBuffer s, int i, int i2, int w1, int i3, int w2) {
		s.append("graph.addAresta("+w1+", \"n"+i+"\", \"n"+i2+"\");");
		s.append("graph.addAresta("+w2+", \"n"+i+"\", \"n"+i3+"\");");
		
	}

	private static void createNode(StringBuffer n, int i, int x, int y) {
		n.append("map.put(\"n"+i+"\", new Point("+x+", "+y+"));");

		
	}

}
