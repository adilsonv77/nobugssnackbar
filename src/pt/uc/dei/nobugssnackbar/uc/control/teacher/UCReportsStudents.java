package pt.uc.dei.nobugssnackbar.uc.control.teacher;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
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

	public List<String[]> retrieveStudents(Long clazzId) throws Exception {
		List<String[]> ret = evaluationDao.loadMissionsFromUsers(clazzId);
		
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

}
