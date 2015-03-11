package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.lang.reflect.Constructor;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JdbcDao {

	protected Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}
	
	protected <T>  List<T> listObjects(String query, Class<T> clazz) throws Exception {
		
		List<T> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			Constructor<?> constr = clazz.getConstructors()[0];
			
			Statement stm = bdCon.createStatement();
			ResultSet rs = stm.executeQuery(query);
			ResultSetMetaData md = rs.getMetaData();
			int qtos = md.getColumnCount();

			while (rs.next()) {
				
				Object[] row = new Object[qtos];
				for (int i = 1; i <= qtos; i++)
					row[i-1] = rs.getObject(i);
					
				@SuppressWarnings("unchecked")
				T o = (T) constr.newInstance(row); 
				
				l.add(o);
			}
			stm.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return l;
		
	}

}
