package pt.uc.dei.nobugssnackbar.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import pt.uc.dei.nobugssnackbar.model.Achievement;
import pt.uc.dei.nobugssnackbar.model.User;

public interface AchievementDao {

	byte[] getAchievementTypeImage(long achievementTypeId) throws SQLException;

	List<Achievement> listAchievements(long userId, Long classId) throws SQLException;

	List<String[]> loadUsersAchievements(Integer clazzId) throws SQLException;

	List<Map<String, String>> verifyAchievements(long userId, long classId, User user) throws SQLException;

}
