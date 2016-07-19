package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.IlsDao;

public class IlsJdbcDao implements IlsDao {

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	// 1-balanced; 2-moderated; 3-strong
	@Override
	public int classifyUserBySequentialStyle(long userId) throws SQLException {
		Connection bdCon = null;
		int ret = 0;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon.prepareStatement("select count(*) from questionnaireanswer where userid = ? and questionanswer = 'SEQGLOA'");
			ps.setLong(1, userId);
			
			ResultSet rs = ps.executeQuery();
			rs.next();
			ret = classifyLevel(rs.getLong(1));
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		return ret;
	}

	private int classifyLevel(long qtd) {
		qtd = (qtd*2) - 11;
		int ret;
		if (qtd <= 3)
			ret = 1;
		else
			if (qtd <= 7)
				ret = 2;
			else
				ret = 3;
		
		return ret;
	}

	// 1-nenhum; 2-cadeiras; 3-curso; 4-profissionalmente
	@Override
	public int userPreviousKnowledge(long userId) throws SQLException {
		int ret = 0;
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			PreparedStatement ps = bdCon.prepareStatement("select questionanswer from questionnaireanswer where userid = ? and questionid = 48");
			ps.setLong(1, userId);
			
			ResultSet rs = ps.executeQuery();
			rs.next();
			
			ret = classifyPK(rs.getString(1));

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
			
		}
		return ret;
	}

	private int classifyPK(String pk) {
		int ret;
		if (pk.equals("N"))
			ret = 1;
		else
			if (pk.equals("F"))
				ret = 2;
			else
				if (pk.equals("C"))
					ret = 3;
				else
					ret = 4;
		return ret;
	}

	@Override
	public long[][] countRandomAccessBasedSequentialStyle(long classId) throws SQLException {
		
		long[][] ret = new long[2][3];
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select userid, count(*), userrandomaccess from questionnaireanswer join users using (userid) where userid in (select userid from classesusers where classid = ?) and questionanswer = 'SEQGLOA' group by userid");
			ps.setLong(1, classId);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				if (rs.getString(3) != null)
					ret[rs.getString(3).equals("T")?0:1][classifyLevel(rs.getLong(2))-1]++;
			}
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
	public long[][] countRandomAccessBasedPreviousKnowledge(long classId) throws SQLException {
		long[][] ret = new long[2][4];
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select userid, questionanswer, userrandomaccess from questionnaireanswer join users using (userid) where userid in (select userid from classesusers where classid = ?) and questionid = 48");
			ps.setLong(1, classId);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				if (rs.getString(3) != null)
					ret[rs.getString(3).equals("T")?0:1][classifyPK(rs.getString(2))-1]++;
			}
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
