package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.ClazzDao;
import pt.uc.dei.nobugssnackbar.model.Clazz;
import pt.uc.dei.nobugssnackbar.model.User;

public class ClazzJdbcDao extends JdbcDao<Clazz>  implements ClazzDao {

	@Override
	public List<Clazz> readByTeacher(long userId) throws Exception {
		return customList(new String[][]{{"teacherid", "="}}, new Long[]{userId});
	}


	@Override
	public Clazz findActiveClazz(User user) throws Exception {
		String query = "select * from classes join classesusers using (classid) where userid = ? and currently = 'T'";

		Clazz ret = null;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setLong(1, user.getId());
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				ret = transformResultSetToObject(rs) ;
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
	public void mapsToUser(Clazz clazz, User user) throws Exception {
		
		String query1 = "select * from classesusers  where classid = ? and userid = ?";
		String query2 = "insert into classesusers (classid, userid, currently) values (?, ?, 'T')";
		String query3 = "update classesusers set currently = 'T' where classid = ? and userid = ?";
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query1);
			ps.setLong(1, clazz.getId());
			ps.setLong(2, user.getId());
			ResultSet rs = ps.executeQuery();
			boolean insert = !rs.next();
			ps.close();
			
			if (insert) {
				query1 = query2;
			} else {
				query1 = query3;
			}

			ps = bdCon.prepareStatement(query1);
			ps.setLong(1, clazz.getId());
			ps.setLong(2, user.getId());
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
	public void deleteFromUser(User user) throws Exception {
		String query = "update classesusers set currently = 'F' where classid = ? and userid = ?";
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setLong(1, user.getClassId());
			ps.setLong(2, user.getId());
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
