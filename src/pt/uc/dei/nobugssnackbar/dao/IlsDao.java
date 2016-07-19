package pt.uc.dei.nobugssnackbar.dao;

import java.sql.SQLException;

public interface IlsDao {

	int classifyUserBySequentialStyle(long userId) throws SQLException;

	int userPreviousKnowledge(long userId) throws SQLException;

	long[][] countRandomAccessBasedSequentialStyle(long classId) throws SQLException;

	long[][] countRandomAccessBasedPreviousKnowledge(long classId) throws SQLException;
	
}
