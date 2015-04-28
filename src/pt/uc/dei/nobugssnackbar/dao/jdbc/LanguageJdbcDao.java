package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pt.uc.dei.nobugssnackbar.dao.LanguageDao;
import pt.uc.dei.nobugssnackbar.model.Language;

public class LanguageJdbcDao extends JdbcDao<Language> implements LanguageDao {

	@Override
	public List<Language> listSimilarCode(String lang) throws Exception {
		List<Language> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("select languageid, languagename, languagecode from languages where languagecode like ?");
			ps.setString(1, "%"+lang+"%");

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				
				Language l1 = new Language();
				l1.setId(rs.getInt(1));
				l1.setName(rs.getString(2));
				l1.setCode(rs.getString(3));
				
				l.add(l1);
				
			}
			ps.close();
		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		
		return l;
	}

}
