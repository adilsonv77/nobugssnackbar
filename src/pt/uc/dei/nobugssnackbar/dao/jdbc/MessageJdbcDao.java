package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.MessageDao;
import pt.uc.dei.nobugssnackbar.model.Message;

public class MessageJdbcDao extends JdbcDao<Message> implements MessageDao {

	@Override
	public Message readMessage(String code, Integer languageId)
			throws Exception {
		
		Message ret = null;
		Connection bdCon = null;
		try {
			bdCon = getConnection();
			PreparedStatement ps = bdCon
					.prepareStatement("select messagetext from messagesi18n where messagecode = ? and languageid = ?");
			
			ps.setString(1, code);
			ps.setInt(2, languageId);

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				
				ret = new Message();
				ret.setLanguageId(languageId);
				ret.setMessageCode(code);
				ret.setMessageText(rs.getString(1));
				
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
