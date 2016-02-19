package pt.uc.dei.nobugssnackbar.dao;

import java.sql.SQLException;

public interface AchievementDao {

	byte[] getAchievementTypeImage(long achievementTypeId) throws SQLException;

}
