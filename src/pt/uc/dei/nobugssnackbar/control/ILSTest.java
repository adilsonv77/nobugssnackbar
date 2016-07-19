package pt.uc.dei.nobugssnackbar.control;

import java.sql.SQLException;

import pt.uc.dei.nobugssnackbar.dao.IlsDao;

public class ILSTest {

	private IlsDao dao;

	public ILSTest(IlsDao dao) {
		this.dao = dao;
	}

	public boolean classifyUser(long classId, int seqStyle, int pk) throws SQLException {
		
		long[][] seqCount = dao.countRandomAccessBasedSequentialStyle(classId);
		
		seqStyle--;
		
		if (seqCount[0][seqStyle] > seqCount[1][seqStyle])
			return false;
		else
			if (seqCount[0][seqStyle] < seqCount[1][seqStyle])
				return true;
			else {
				long[][] pkCount = dao.countRandomAccessBasedPreviousKnowledge(classId);
				pk--;
				if (pkCount[0][pk] > pkCount[1][pk]) 
					return false;
				else
					return true;
			}
					
	}

}
