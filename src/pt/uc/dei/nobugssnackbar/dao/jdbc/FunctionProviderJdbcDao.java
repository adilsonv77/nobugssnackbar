package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.model.mission.Function;

public class FunctionProviderJdbcDao extends JdbcDao implements FunctionProviderDao {

	@Override
	public List<Function> list() throws Exception {
		
		return listObjects("select * from functionsprovider", Function.class);
	}
	
	public void insertFunction(String name, String returnType, String description) throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into functionsprovider (functionsprovidername, functionsproviderreturn, functionsproviderdescription) values (?, ?, ?)");
			ps.setString(1, name);
			ps.setString(2, returnType);
			ps.setString(2, description);

			ps.executeUpdate();
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}
	
	@Override
	public Function read(long key) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Function obj) throws Exception {
		// TODO Auto-generated method stub
		
	}
}
