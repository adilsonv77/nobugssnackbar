package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
	public List<User> listByClass(Long classId) throws Exception {
		String query = "select * from users join classesusers using (userid) where classid = ?";

		List<User> ret = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setLong(1, classId);
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

	@Override
	public Long findByMail(String mail) throws Exception {
		String query = "select userid from users  where usermail = ?";

		Long ret = null;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setString(1, mail);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				ret = rs.getLong(1);
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

	@Override
	public String createNewPassword(User user) throws Exception {
		
		Random r = new Random();
		String query = "update users set userpassw=md5(?) where userid = ?";

		String ret = null;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			ret = extractChar(r) + extractChar(r) + extractChar(r) + extractChar(r) + extractChar(r) + extractChar(r) + extractChar(r) + extractChar(r); 
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setString(1, ret);
			ps.setLong(2, user.getId());
			ps.executeUpdate();
			
	
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
		return ret;
		
	}
	
	private static final String SEED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	private String extractChar(Random r) {
		
		int x = r.nextInt(SEED.length()-1) + 1;
		return SEED.substring(x, x+1);
	}

}
