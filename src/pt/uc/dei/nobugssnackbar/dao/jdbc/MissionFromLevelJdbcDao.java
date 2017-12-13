package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.MissionFromLevelDao;
import pt.uc.dei.nobugssnackbar.model.MissionFromLevel;

public class MissionFromLevelJdbcDao extends JdbcDao<MissionFromLevel> implements MissionFromLevelDao  {

	@Override
	public List<MissionFromLevel> list(Long clazzId) throws Exception {
		List<MissionFromLevel> ret = null;
		Connection bdCon = null;
		try {

			bdCon = getConnection();
			PreparedStatement ps = bdCon.prepareStatement("select missionorder, missionid, missionname, missioncontent, missionrepeatable, missiontype, missionorder, classid, classlevelid from missions join classesmissions using (missionid) where classid = ? order by classlevelid, missionorder;");
			ps.setLong(1, clazzId);
			ResultSet rs = ps.executeQuery();
			ret = new ArrayList<>();
			while (rs.next()) {

				MissionFromLevel m = transformResultSetToObject(rs);
				ret.add(m);
				
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
	public void insert(MissionFromLevel missionFromLevel) throws Exception {
		
		_save(true, missionFromLevel);
		
	}

	private void _save(boolean insert, MissionFromLevel missionFromLevel) throws Exception {
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			if (insert) {
				PreparedStatement sql = bdCon.prepareStatement("insert into missions (missionname, missioncontent, missionrepeatable, missiontype) values (?,?,?,?)");
				sql.setString(1, missionFromLevel.getName());
				sql.setString(2, missionFromLevel.getContent());
				sql.setInt(3, (missionFromLevel.isRepeatable()?1:0));
				sql.setString(4, missionFromLevel.getType());
				sql.execute();
				
				Statement st = bdCon.createStatement();
				ResultSet rs = st.executeQuery("select last_insert_id()");
				rs.next();
				missionFromLevel.setId(rs.getLong(1));
				st.close();
				
				sql = bdCon.prepareStatement("insert into classesmissions (classid, classlevelid, missionorder, missionid, missioncust, freeaccess) values (?, ?, ?, ?, 0, 'F')");
				sql.setLong(1, missionFromLevel.getClassId());
				sql.setLong(2, missionFromLevel.getClassLevelId());
				sql.setLong(3, missionFromLevel.getOrder());
				sql.setLong(4, missionFromLevel.getId());
				sql.execute();
				
			} else {
				PreparedStatement sql = bdCon.prepareStatement("update missions set missionname = ?, missioncontent = ?, missiontype = ? where missionid = ?");
				sql.setString(1, missionFromLevel.getName());
				sql.setString(2, missionFromLevel.getContent());
				sql.setString(3, missionFromLevel.getType());
				sql.setLong(4, missionFromLevel.getId());
				sql.execute();

				sql = bdCon.prepareStatement("update classesmissions set classlevelid = ?, missionorder = ? where missionid = ? and classid = ?");
				sql.setLong(1, missionFromLevel.getClassLevelId());
				sql.setLong(2, missionFromLevel.getOrder());
				sql.setLong(3, missionFromLevel.getId());
				sql.setLong(4, missionFromLevel.getClassId());
				sql.execute();
			}
			
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	}

	@Override
	public void update(MissionFromLevel missionFromLevel) throws Exception {
		_save(false, missionFromLevel);
	}
}
