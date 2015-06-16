package pt.uc.dei.nobugssnackbar.dao;

import java.util.List;

import pt.uc.dei.nobugssnackbar.model.Questionnaire;
import pt.uc.dei.nobugssnackbar.model.User;

public interface GameDao {

	void finishMission(User user, long mission, long classid, int i,
			int timeSpend, long execution, boolean b, int typeRunning, String answer)
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

	Object[][] retrieveMissions(long id) throws Exception;

	List<Questionnaire> retrieveQuestionnaire(User user, Object[][] missions)
			throws Exception;

	Long getUserId(String userName) throws Exception;

	void storeMissionFail(long execution, long id, long mission, long classid,
			String[][] goals) throws Exception;

	void storeMissionError(int execution, long id, long mission, long classid,
			String idError, String blockId, String errorMessage)
			throws Exception;

	String[] loadMachine(int code, String destFolder) throws Exception;

	List<String> listMachines(long id) throws Exception;

	void buyMachine(long id, int machineId) throws Exception;

	List<Object[]> loadMachineData(Integer[] machineid, String destFolder) throws Exception;

	List<Object[]> retrieveLeaderBoard(long id, List<Long> classesId)
			throws Exception;

	boolean isUserAllowed(String usernick) throws Exception;

	boolean isEmailAllowed(String usermail) throws Exception;

	long getDefaultClass(String lang) throws Exception;

	Questionnaire retrieveParticularQuestionnaire(User user, long l)
			throws Exception;

	String[] registerUser(String id) throws Exception;

	List<Object[]> retrieveAvatarParts(long id) throws Exception;

}
