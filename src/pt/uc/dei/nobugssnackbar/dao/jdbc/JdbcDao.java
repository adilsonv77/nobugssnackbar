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
	private PreparedStatement queryUpdate;
	private PreparedStatement queryDelete;

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
		String updateColumns = "";
		String pkColumns = "";
		
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
					pkColumns = pkColumns + "  " + jdbcField.name() + " = ? and";
					pks.add(f);
					if (pk.autoIncrement())
						insertColumn = false;
				} else 
					updateColumns = updateColumns + jdbcField.name() + " = ?,";

				if (insertColumn) {
					insertColumns = insertColumns + jdbcField.name() + ",";
					qtdInsert++;
				}
			}
		}

		columns = columns.substring(0, columns.length() - 1);
		insertColumns = insertColumns.substring(0, insertColumns.length() - 1);
		updateColumns = updateColumns.substring(0, updateColumns.length() - 1);
		pkColumns = pkColumns.substring(0, pkColumns.length() - 4);

		JdbcTable jdbcTable = persistentClass.getAnnotation(JdbcTable.class);
		try {
			String query = "select " + columns + " from " + jdbcTable.name();
			this.querySelect = getConnection().prepareStatement(query);

			query = query + " where " + pkColumns;
			this.readSelect = getConnection().prepareStatement(query);

			String params = StringUtils.repeat("?,", qtdInsert - 1) + "?";

			this.queryInsert = getConnection().prepareStatement(
					"insert into " + jdbcTable.name() + " ( " + insertColumns
							+ " ) values (" + params + ")");
			
			
			this.queryUpdate = getConnection().prepareStatement(
					"update " + jdbcTable.name() + " set " + updateColumns + " where " + pkColumns );
			
			this.queryDelete = getConnection().prepareStatement(
					"delete from "  + jdbcTable.name() + " where " + pkColumns );

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

			rs.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
		return l;

	}

	/**
	 * Stores the obj in the database. If one key is null, then inserts it in the table. Otherwise, it updates it.
	 * TODO If the table does not have autoincrement fiels then the comparison rule == null is not valid.
	 * 
	 * @param obj
	 * @throws Exception
	 */
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

				addFieldsQuery(queryInsert, obj);
				
				queryInsert.executeUpdate();

			} else {
				
				int qtos = addFieldsQuery(queryUpdate, obj);
				for (Field f : pks) {
					queryUpdate.setObject(qtos, f.get(obj));
					qtos++;
				}

				queryUpdate.executeUpdate();

			}

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}

	}

	private int addFieldsQuery(PreparedStatement query, T obj) throws Exception {
		int i = 1;
		for (Field f : fields) {
			JdbcPk pk = f.getAnnotation(JdbcPk.class);
			if (pk == null || (pk != null && !pk.autoIncrement())) {
				query.setObject(i, f.get(obj));
				i++;
			}
		}
		return i;
	}

	public final T read(Object... key) throws Exception {
		
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
			rs.close();

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
	
	public final void delete(Object... key) throws Exception {
		Connection bdCon = null;
		try {
			
			bdCon = getConnection();
			for (int i = 0; i < pks.size(); i++) {
				queryDelete.setObject(i+1, key[i]);
			}
			
			queryDelete.executeUpdate();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	
	}

}
