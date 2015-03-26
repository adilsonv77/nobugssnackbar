package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.FunctionProviderDao;
import pt.uc.dei.nobugssnackbar.model.Function;

public class FunctionProviderJdbcDao extends JdbcDao<Function> implements FunctionProviderDao {

	public void insertFunction(String name, String returnType, String description) throws SQLException {

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("insert into functionsprovider (functionsprovidername, functionsproviderreturn, functionsproviderdescription) values (?, ?, ?)");
			ps.setString(1, name);
			ps.setString(2, returnType);
			ps.setString(3, description);

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
}
