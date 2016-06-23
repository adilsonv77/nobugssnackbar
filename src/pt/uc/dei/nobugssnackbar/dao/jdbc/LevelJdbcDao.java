package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.LevelDao;
import pt.uc.dei.nobugssnackbar.model.Level;

public class LevelJdbcDao implements LevelDao {

	@Override
	public List<Level> list(Long clazzId) throws Exception {
		
		List<Level> ret = null;
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select classlevelorder, classlevelname, liberacaodt from classeslevels where classid = ? order by classlevelorder");
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			ret = new ArrayList<>();
			while (rs.next()) {
				
				Level l = new Level();
				l.setOrder(rs.getInt(1));
				l.setName(rs.getString(2));
				l.setRelease(new java.util.Date(rs.getDate(3).getTime()));
				
				ret.add(l);
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

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	@Override
	public void save(long clazzId, Level l) throws Exception {
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("update classeslevels set classlevelname=?, liberacaodt=? where classid = ? and classlevelorder = ?");
			ps.setString(1, l.getName());
			ps.setDate(2, new java.sql.Date(l.getRelease().getTime()));
			ps.setLong(3, clazzId);
			ps.setLong(4, l.getOrder());
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
