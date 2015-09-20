package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;
import java.util.Map;

import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.Test;
import pt.uc.dei.nobugssnackbar.model.User;

public interface GameDao {

	void finishMission(User user, long mission, long classid, int xp, int money,
			int timeSpend, long execution, boolean b, int typeRunning, float zoomLevel, 
			String answer)
			throws Exception;

	User login(String nick, String encrypt) throws Exception;

	void updateUserLastTime(User user) throws Exception;

	void insertUser(String userNick, String userPassword, String userName,
			String sex, String userMail, String lang, long classes[]) throws Exception;

	String[][] loadMission(User user, int clazzId, int levelId, int missionIdx)
			throws Exception;

	void insertAnswer(long questionnaireId, long questionId, long userId,
			String answer) throws Exception;

	void addExecutionInMission(User user, long mission, long classid)
			throws Exception;

	String loadAnswer(int idMission, long id) throws Exception;

	Map<?,?> retrieveMissions(long id) throws Exception;

	List<Questionnaire> retrieveQuestionnaire(User user, Object[][] missions)
			throws Exception;

	Long getUserId(String userName) throws Exception;

	void storeMissionFail(long execution, long testCount, long id, long mission, long classid,
			String[][] goals) throws Exception;

	void storeMissionError(int execution, long testCount, long id, long mission, long classid,
			String idError, String blockId, String errorMessage)
			throws Exception;

	String[] loadMachine(int code, String destFolder) throws Exception;

	List<String> listMachines(long id) throws Exception;

	void buyMachine(long id, int machineId) throws Exception;

	List<Object[]> loadMachineData(Integer[] machineid, String destFolder) throws Exception;

	List<Object[]> retrieveLeaderBoard(long id, Long classId)
			throws Exception;

	boolean isUserAllowed(String usernick) throws Exception;

	boolean isEmailAllowed(String usermail) throws Exception;

	long getDefaultClass(String lang) throws Exception;

	Questionnaire retrieveParticularQuestionnaire(User user, long l)
			throws Exception;

	String[] registerUser(String id) throws Exception;

	List<Object[]> retrieveAvatarParts(long id) throws Exception;

	void saveAvatarParts(long userid, String[][] avatarConfig, byte[] photo) throws Exception;

	byte[] getUserPhoto(long userid) throws Exception;

	Test[] loadTests(User user, Object[][] missions) throws Exception;

	void saveTestQuestionAnswer(int testId, int questionId, long userId,
			int timeSpent, String answer) throws Exception;

	int[] calculateTestRewards(int testId, long userId) throws Exception;

	void saveUserRewards(User user) throws Exception;

	void saveFlag(long userid, String name, String value) throws Exception;

	void saveClicks(long userid, String[][] clicks) throws Exception;

	void changeUser(User user) throws Exception;

	List<String[]> loadStatusMissions(long classid) throws Exception;

	List<Map<String, String>> loadUsersInTheMission(int clazzId, int missionId, String[] listOfUsers) throws Exception;

	List<Map<String, Object>> loadAttemptsFromUser(long userId, int missionId) throws Exception;

}
