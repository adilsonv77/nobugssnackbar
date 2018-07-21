import java.io.File;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class CriarSenhas {

	/*
	 * Verificar se todas as m�quinas do laborat�rio est�o ativas. Comunicar o NTI de 
	 * qualquer problema (era bom j� fazer isso na segunda)
	 * 
     * Passos a serem seguidos dias antes da prova (fa�a isso dentro do MySQL):
     * 1-Configurar as duas fases extra para o dia 21/3.
     * 2-Configurar a fase do grupo 1 para come�ar �s 18:50 e terminar 20:30 
     * 3-Configurar a fase do grupo 2 para come�ar �s 20:40 e terminar 22:20 
     * 4-Passar ao Carlos a lista de alunos que far�o a prova em cada hor�rio. 
     *   Avisar a ele que pode acontecer de alunos quererem trocar o hor�rio. 
     *   Nesse caso, precisa trocar sempre entre dois alunos, 1 de cada hor�rio.
     *   Se isso acontecer, ele precisa te avisar para trocares do banco de dados.

	 * 	

	 * Passos a serem seguidos 1 hora antes da prova:
	 * 1-Execute essa classe para mudar as senhas da turma (n�o esque�a de trocar as linhas de coment�rio para conexao)
	 * 2-V� na aplica��o teacher, entre na op��o de logados, e derrube todos.
	 * 3-Pegue os dois arquivos gerados (g2t1.csv e g2t2.csv) e imprima.
	 * 
	 * Durante a prova
	 * 1-Pe�a para o aluno assinar o nome na lista impressa no passo 3 e j� passe para ele a senha.
	 * 2-Quando tiver terminado, pe�a para ele chamar o professor, para conferir que as miss�es est�o ou n�o cumpridas.
	 * 3-Pe�a para ele sair do jogo, e execute o update abaixo:
	 *    update users set userenabled = "F" where userid = ?;
	 *    
	 *  Substitua o ? pelo id do usu�rio
	 *  
	 *  Depois das 22:20hs (pode ser no outro dia come�o da tarde):
	 *  update users set userenabled = "F", userpassw = md5(usernick); 
	 * 
	 */
	
	
	public static void main(String[] args) throws Exception {
		r = new Random();
		s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		Class.forName("com.mysql.jdbc.Driver");
		
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/nobugs20170306", "root", "root");
//		Connection con = DriverManager.getConnection("jdbc:mysql://nobugs.ceavi.udesc.br:3306/newnobugs", "root", "Xj785m");
		
		List<Long> users = new ArrayList<>();
		List<String> passw =  new ArrayList<>();

		for (int a=1; a<=2; a++) {
			
			users.clear();
			passw.clear();
			
			Statement stm = con.createStatement();
			ResultSet rs = stm.executeQuery("select userid from levelsextrausers where levelsextraid = "+(a+5));
			while (rs.next()) {
				users.add(rs.getLong(1));
			}
			stm.close();
			
			
			PreparedStatement ps = con.prepareStatement("update users set userpassw = md5(?) where userid = ?");
			for (Long userid:users) {
				String s = extractChar() + extractChar() + extractChar() + extractChar(); 
				ps.setString(1, s);
				ps.setLong(2, userid);
				ps.executeUpdate();
				
				passw.add(s);
			}
			ps.close();
			
			PrintWriter pw = new PrintWriter(new File("g2t"+a+".csv"));
			ps = con.prepareStatement("select username from users where userid = ?");
			for (int i=0; i<passw.size(); i++) {
				ps.setLong(1, users.get(i));
				rs = ps.executeQuery();
				rs.next();
				pw.print(users.get(i)+";"+rs.getString(1)+";"+passw.get(i));
			}
			pw.close();
			
		}
		
		con.close();

	}

	private static Random r;
	private static String s;

	private static String extractChar() {
		
		int x = r.nextInt(s.length()-1) + 1;
		return s.substring(x, x+1);
	}
	
}
