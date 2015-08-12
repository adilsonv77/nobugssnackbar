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
	private JdbcTable jdbcTable;
	private String columns;
	private String insertColumns;
	private String insertParams;
	private String updateColumns;
	private String pkColumns;

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

		this.columns = columns.substring(0, columns.length() - 1);
		this.insertColumns = insertColumns.substring(0, insertColumns.length() - 1);
		this.updateColumns = updateColumns.substring(0, updateColumns.length() - 1);
		this.pkColumns = pkColumns.substring(0, pkColumns.length() - 4);
		this.insertParams = StringUtils.repeat("?,", qtdInsert - 1) + "?";

		this.jdbcTable = persistentClass.getAnnotation(JdbcTable.class);
	}
	
	private PreparedStatement getQuerySelect(Connection con) throws SQLException {
		String query = "select " + columns + " from " + jdbcTable.name();
		return con.prepareStatement(query);
	}

	private PreparedStatement getQueryInsert(Connection con) throws SQLException {

		return con.prepareStatement(
				"insert into " + jdbcTable.name() + " ( " + insertColumns
				+ " ) values (" + insertParams + ")");

	}

	private PreparedStatement getQueryUpdate(Connection con) throws SQLException {
		return con.prepareStatement(
				"update " + jdbcTable.name() + " set " + updateColumns + " where " + pkColumns );
	}


	private PreparedStatement getQueryReadSelect(Connection con) throws SQLException {
		String query = "select " + columns + " from " + jdbcTable.name() +
							" where " + pkColumns;
		return con.prepareStatement(query);
	}

	private PreparedStatement getQueryDelete(Connection con) throws SQLException {
		return con.prepareStatement(
				"delete from "  + jdbcTable.name() + " where " + pkColumns );
	}

	protected Connection getConnection() throws SQLException {
		return NoBugsConnection.getConnection().getDataSource().getConnection();
	}

	public final List<T> list() throws Exception {

		List<T> l = new ArrayList<>();
		Connection bdCon = null;
		try {
			bdCon = getConnection();

			PreparedStatement q = getQuerySelect(bdCon);
			ResultSet rs = q.executeQuery();

			while (rs.next()) {

				l.add( transformResultSetToObject(rs) );
			}

			rs.close();
			q.close();

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
				if (f.get(obj) == null || (f.getType() == Integer.class && ((Integer)f.get(obj)) == 0)
									   || (f.getType() == Long.class && ((Long)f.get(obj)) == 0)) {
					insert = true;
					break;
				}
			}

			if (insert) {

				PreparedStatement q = getQueryInsert(bdCon);
				
				addFieldsQuery(q, obj);
				
				q.executeUpdate();
				q.close();

			} else {
				PreparedStatement q = getQueryUpdate(bdCon);
				int qtos = addFieldsQuery(q, obj);
				for (Field f : pks) {
					q.setObject(qtos, f.get(obj));
					qtos++;
				}

				q.executeUpdate();
				q.close();

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
			PreparedStatement readSelect = getQueryReadSelect(bdCon);
			for (int i = 0; i < pks.size(); i++) {
				readSelect.setObject(i+1, key[i]);
			}
			
			ResultSet rs = readSelect.executeQuery();
			if (rs.next()) {
				obj = transformResultSetToObject(rs);
			}
			rs.close();
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
	
	public final void delete(Object... key) throws Exception {
		Connection bdCon = null;
		try {
			
			bdCon = getConnection();
			PreparedStatement queryDelete = getQueryDelete(bdCon);
			for (int i = 0; i < pks.size(); i++) {
				queryDelete.setObject(i+1, key[i]);
			}
			
			queryDelete.executeUpdate();
			queryDelete.close();

		} finally {
			if (bdCon != null)
				try {
					bdCon.close();
				} catch (SQLException ignore) {
				}
		}
	
	}


}
