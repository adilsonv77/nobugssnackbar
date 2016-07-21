package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import pt.uc.dei.nobugssnackbar.dao.EvaluationDao;

@ManagedBean(name = "ucreportsstudents")
@ApplicationScoped
public class UCReportsStudents implements Serializable {

	private static final long serialVersionUID = 1L;

	@ManagedProperty(value = "#{factoryDao.evaluationDao}")
	private transient EvaluationDao evaluationDao;

	public EvaluationDao getEvaluationDao() {
		return evaluationDao;
	}

	public void setEvaluationDao(EvaluationDao evaluationDao) {
		this.evaluationDao = evaluationDao;
	}

	/*
	 * Modifier : 0 - by executions - returns ordered by name
	 * 			  1 - by time spent
	 *            2 - qt see explanation
	 */
	public List<String[]> listStudents(Long clazzId, String finishDate, int modifier) throws Exception {
		List<String[]> ret = evaluationDao.loadMissionsFromUsers(clazzId, finishDate, modifier);
		
		// calculate who is an outlier
		String[] missions = ret.get(0);
		for (int i = 1; i < missions.length; i++) {
			int qt = Integer.parseInt(missions[i].split(";")[2]);
			if (qt > 5) { // if there are more than 5 achieved missions, then I can calculate the outlier
				
				List<Double> attempts = new ArrayList<>();
				for (int j = 1; j<ret.size(); j++) {
					String[] st = ret.get(j);
					if (st[i] != null) {
						attempts.add(Double.parseDouble(st[i].split(";")[1]));
					}
				}
				
				// calculate the min value to not belong to outlier
				Double[] arr = attempts.toArray(new Double[attempts.size()]);
				Arrays.sort(arr);
				
				DescriptiveStatistics stat = new DescriptiveStatistics(ArrayUtils.toPrimitive(arr));
				double q3 = stat.getPercentile(75);
				double q1 = stat.getPercentile(25);
				double iqr = q3 - q1;
				double valIfOutlier = q3 + (1.5*iqr);
				
				for (int j = 1; j<ret.size(); j++) {
					String[] st = ret.get(j);
					if (st[i] != null) {
						String[] s = st[i].split(";");
						double sv = Double.parseDouble(s[1]);
						if (sv > valIfOutlier)
							st[i] = (s[0].equals("T")?"O;":"X;")+s[1];
					}
				}

			}
		}
		
		return ret;
	}

	public List<String[]> listStudentsByOutliersInAttempts(Long clazzId, String finishDate) throws Exception {
		
		List<String[]> s = listStudents(clazzId, finishDate, 0);
		Collections.sort(s, new Comparator<String[]>() {

			private float countOutliers(String[] s) {
				float ret = 0;
				float howMany = 0;
				for (String z:s) {
					if (z != null) {
						howMany++;
						String t = z.split(";")[0];
						if (t.equals("O") || t.equals("X"))
							ret++;
					}
						
				}
				if (ret == 0)
					return 0;
				
				return ret/howMany;
			}
			
			@Override
			public int compare(String[] arg0, String[] arg1) {

				// the first row is unsortable
				if (arg0[0] == null)
					return -500;
				else
					if (arg1[0] == null)
						return 500;
				
				float c1 = countOutliers(arg0);
				float c2 = countOutliers(arg1);
				return (c1 > c2?-1:(c2 > c1?1:0)); // inverse because I want first the biggest 
				
			}});
		
		return s;
	}

	public List<String[]> listStudentsByMissionsAchieved(Long clazzId, String finishDate) throws Exception {
		List<String[]> s = listStudents(clazzId, finishDate, 0);
		
		Collections.sort(s, new Comparator<String[]>() {

			@Override
			public int compare(String[] arg0, String[] arg1) {
				// the first row is unsortable
				if (arg0[0] == null)
					return -500;
				else
					if (arg1[0] == null)
						return 500;
				
				int c1 = countMissions(arg0);
				int c2 = countMissions(arg1);
				
				return (c1 - c2); // I want first with less missions finished
			}

			private int countMissions(String[] s) {
				int howMany = 0;
				for (String z:s) {
					if (z != null) {
						String t = z.split(";")[0];
						if (!(t.equals("F") || t.equals("X")))
							howMany++;
					}
						
				}
				return howMany;
			}
			
		});
		
		return s;
	}

	public List<String[]> listStudentsByTimeSpent(Long clazzId, String finishDate) throws Exception {
		
		List<String[]> s = listStudents(clazzId, finishDate, 1);
		Collections.sort(s, new Comparator<String[]>() {

			@Override
			public int compare(String[] o1, String[] o2) {
				
				// the first row is unsortable
				if (o1[0] == null)
					return -500;
				else
					if (o2[0] == null)
						return 500;
				int c1 = sumTime(o1);
				int c2 = sumTime(o2);
				return (c2 - c1); // inverse because I want first with most time spent
			}

			private int sumTime(String[] s) {
				int totTime = 0;
				for (String z:s) {
					if (z != null) {
						String t = z.split(";")[1];
						totTime += Integer.parseInt(t);
					}
						
				}
				return totTime;
			}
			
		});
		return s;
	}

	public List<String[]> listStudentsByExplanationEntry(Long clazzId, String finishDate) throws Exception {
		List<String[]> s = listStudents(clazzId, finishDate, 2);
		return s;
	}

	public List<String[]> listStudentsByExplanationTime(Long clazzId, String finishDate) throws Exception {
		List<String[]> s = listStudents(clazzId, finishDate, 3);
		return s;
	}
}
