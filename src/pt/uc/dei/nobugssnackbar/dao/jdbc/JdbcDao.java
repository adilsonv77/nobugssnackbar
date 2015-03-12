package pt.uc.dei.nobugssnackbar.dao.jdbc;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

public class JdbcDao<T> {

	private Class<T> persistentClass;
	private List<Field> pks;
	private List<Field> fields;
	private PreparedStatement querySelect;
	private PreparedStatement readSelect;
	private PreparedStatement queryInsert;

	@SuppressWarnings("unchecked")
	public JdbcDao() {
		persistentClass = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];

		// extract columns and pks
		this.pks = new ArrayList<>();
		this.fields = new ArrayList<>();

		Field[] declFields = persistentClass.getDeclaredFields();

		String columns = "";
		String insertColumns = "";
		int qtdInsert = 0;
		for (Field f : declFields) {
			JdbcField jdbcField = f.getAnnotation(JdbcField.class);
			if (jdbcField != null) {
				f.setAccessible(true);
				fields.add(f);

				columns = columns + jdbcField.name() + ",";

				JdbcPk pk = f.getAnnotation(JdbcPk.class);
				boolean insertColumn = true;
				if (pk != null) {
					pks.add(f);
					if (pk.autoIncrement())
						insertColumn = false;
				}
				if (insertColumn) {
					insertColumns = insertColumns + jdbcField.name() + ",";
					qtdInsert++;
				}
			}
		}

		columns = columns.substring(0, columns.length() - 1);
		insertColumns = insertColumns.substring(0, insertColumns.length() - 1);

		JdbcTable jdbcTable = persistentClass.getAnnotation(JdbcTable.class);
		try {
			String query = "select " + columns + " from " + jdbcTable.name();
			this.querySelect = getConnection().prepareStatement(query);

			query = query + " where ";
			for (Field f : pks) {
				query = query + " " + f.getAnnotation(JdbcField.class).name()
						+ " = ? and";
			}
			query = query.substring(0, query.length() - 4);
			this.readSelect = getConnection().prepareStatement(query);

			String params = StringUtils.repeat("?,", qtdInsert - 1) + "?";

			this.queryInsert = getConnection().prepareStatement(
					"insert into " + jdbcTable.name() + " ( " + insertColumns
							+ " ) values (" + params + ")");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	protected Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	public final List<T> list() throws Exception {

		List<T> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			ResultSet rs = querySelect.executeQuery();

			while (rs.next()) {

				l.add( transformResultSetToObject(rs) );
			}

			querySelect.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return l;

	}

	public final void save(T obj) throws Exception {

		Connection bdCon = null;
		try {
			bdCon = getConnection();

			boolean insert = false;

			for (Field f : pks) {
				if (f.get(obj) == null) {
					insert = true;
					break;
				}
			}

			if (insert) {

				int i = 1;
				for (Field f : fields) {
					JdbcPk pk = f.getAnnotation(JdbcPk.class);
					if (pk == null || (pk != null && !pk.autoIncrement())) {
						queryInsert.setObject(i, f.get(obj));
						i++;
					}
				}
				queryInsert.executeUpdate();
				queryInsert.close();

			} else {

			}

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	public T read(Object... key) throws Exception {
		
		T obj = null;
		Connection bdCon = null;
		try {
			
			bdCon = getConnection();
			for (int i = 0; i < pks.size(); i++) {
				readSelect.setObject(i+1, key[i]);
			}
			
			ResultSet rs = readSelect.executeQuery();
			if (rs.next()) {
				obj = transformResultSetToObject(rs);
			}
			readSelect.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

		return obj;
	}

	private T transformResultSetToObject(ResultSet rs) throws Exception {
		
		T obj = persistentClass.newInstance();

		for (Field f : fields) {
			JdbcField jdbcField = f.getAnnotation(JdbcField.class);
			if (jdbcField != null) {
				Object value = rs.getObject(jdbcField.name());
				if (f.getType() == Boolean.class
						|| f.getType() == boolean.class)
					value = ((Integer) value).equals(1);

				f.set(obj, value);
			}
		}

		return obj;
	}

}
