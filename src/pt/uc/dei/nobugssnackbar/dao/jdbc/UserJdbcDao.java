package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.UserDao;
import pt.uc.dei.nobugssnackbar.model.User;

public class UserJdbcDao extends JdbcDao<User> implements UserDao {

	@Override
	public boolean hasClasses(String nick, String passw) throws Exception {
		
		boolean ret = false;
		
		String query = "select count(*) from users join classes on userid=teacherid where usernick = ? and userpassw = ?";

		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setString(1, nick);
			ps.setString(2, passw);
			
			ResultSet rs = ps.executeQuery();
			rs.next();
			
			ret = rs.getLong(1) > 0;
			
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
		return ret;
	}

	@Override
	public User readByNick(String nick) throws Exception {
		List<User> l = this.customList(new String[][]{{"usernick", "="}}, new String[]{nick});
		if (l.size() == 0)
			return null;
		else
			return l.get(0);
	}

	@Override
	public List<User> listByClass(Integer classId) throws Exception {
		String query = "select * from users join classesusers using (userid) where classid = ?";

		List<User> ret = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setInt(1, classId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ret.add( transformResultSetToObject(rs) );
			}
			ps.close();
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
		return ret;
	}


}
