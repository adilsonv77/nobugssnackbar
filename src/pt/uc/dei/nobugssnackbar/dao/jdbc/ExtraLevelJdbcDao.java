package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.ExtraLevelDao;
import pt.uc.dei.nobugssnackbar.model.ExtraLevel;

public class ExtraLevelJdbcDao implements ExtraLevelDao {

	private Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}
	
	@Override
	public List<ExtraLevel> list(Long clazzId) throws Exception {
		
		List<ExtraLevel> ret = null;
		
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select levelsextraid, classlevelid, le.classid, dtaplicacao, hrinicio, hrfim, classlevelname from levelsextra le join classeslevels cl on le.classid = cl.classid and classlevelorder = classlevelid where le.classid = ?");
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			ret = new ArrayList<>();
			while (rs.next()) {
				
				ExtraLevel l = new ExtraLevel();
				
				l.setId(rs.getLong(1));
				l.setLevelId(rs.getLong(2));
				l.setClassId(rs.getLong(3));
				l.setDtAplicacao(new java.util.Date(rs.getDate(4).getTime()));
				l.setHrInicio(new java.util.Date(rs.getTime(5).getTime()));
				l.setHrFim(new java.util.Date(rs.getTime(6).getTime()));
				l.setNome(rs.getString(7));
				
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

	
	private void save(ExtraLevel l, String query) throws Exception {
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement(query);
			
			ps.setLong(1, l.getLevelId());
			ps.setLong(2, l.getClassId());
			ps.setDate(3, new java.sql.Date(l.getDtAplicacao().getTime()));
			ps.setTimestamp(4, new java.sql.Timestamp((l.getHrInicio()).getTime()));
			ps.setTimestamp(5, new java.sql.Timestamp((l.getHrFim()).getTime()));
			ps.setLong(6, l.getId());

			ps.executeUpdate();
			ps.close();
		} catch(Exception ex) {
			ex.printStackTrace();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
	}

	@Override
	public void insert(ExtraLevel level) throws Exception {
		save(level, "insert into levelsextra (classlevelid, classid, dtaplicacao, hrinicio, hrfim, levelsextraid) values (?,?,?,?,?,?)");
	}

	@Override
	public void update(ExtraLevel level) throws Exception {
		save(level, "update levelsextra set classlevelid=?, classid=?, dtaplicacao=?, hrinicio=?, hrfim=? where levelsextraid = ?");
	}
	
}
