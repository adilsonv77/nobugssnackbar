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

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}
	
	@Override
	public List<Level> list(Long clazzId) throws Exception {
		
		List<Level> ret = null;
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select classlevelorder, classlevelname, liberacaodt, classlevelsubject from classeslevels where classid = ? order by classlevelorder");
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			ret = new ArrayList<>();
			while (rs.next()) {
				
				Level l = new Level();
				l.setOrder(rs.getInt(1));
				l.setOrderOriginal(rs.getInt(1));
				l.setName(rs.getString(2));
				l.setRelease(new java.util.Date(rs.getDate(3).getTime()));
				l.setSubject(rs.getString(4));
				l.setClassId(clazzId);
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

	
	private void save(Level l, String query) throws Exception {
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement(query);
			ps.setString(1, l.getName());
			ps.setDate(2, new java.sql.Date(l.getRelease().getTime()));
			ps.setString(3, l.getSubject());
			ps.setLong(4, l.getOrder());
			ps.setLong(5, l.getClassId());
			if (l.getOrderOriginal() > 0)
				ps.setLong(6, l.getOrderOriginal());
			ps.executeUpdate();
			ps.close();
		} catch(Exception ex) {
			ex.printStackTrace();
		} finally {
			if (bdCon != null)
				try {
					l.setOrderOriginal(l.getOrder());
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
	}

	@Override
	public void insert(Level level) throws Exception {
		save(level, "insert into classeslevels (classlevelname, liberacaodt, classlevelsubject, classlevelorder, classid) values (?,?,?,?,?)");
	}

	@Override
	public void update(Level level) throws Exception {
		save(level, "update classeslevels set classlevelname=?, liberacaodt=?, classlevelsubject=?, classlevelorder=? where classid = ? and classlevelorder = ?");
	}
	
}
